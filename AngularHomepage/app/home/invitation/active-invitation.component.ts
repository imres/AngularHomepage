import {
    Component, OnInit, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA,
    ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges, ViewContainerRef, Injectable
} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { DialogService } from "ng2-bootstrap-modal";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Person, Invitation, InvitationExtended, PostNordSchema } from '../../_models/index';
import { UserService, InvitationService, ConsignmentService, AlertService, ToastrService, PaymentService, FilterService } from '../../_services/index';
import { ConfirmComponent } from '../../_dialog/confirm.component';
import { InviteResponseComponent } from '../../_dialog/invite-response.component';
import { InvitationStatusEnum } from '../../_models/enums/index';

export interface InvitationWithPackageId {
    invitation: Invitation;
    packageId: string;
}

@Component({
    moduleId: module.id,
    selector: 'active-invitation',
    templateUrl: 'active-invitation.component.html'
})

@Injectable()
export class ActiveInvitationComponent implements OnInit {
    invitations: Invitation[];
    activeInvitations: Invitation[];
    
    currentUser: Person;
    //unrespondedInvitations: Invitation[];
    maxSliceValue = 4;
    minSliceValue = 0;
    invitationStatus = InvitationStatusEnum;
    showInvitations = true;
    showAllInvitationsEnabled = false;
    showPackageIdForm = false;
    
    
    invitationExtended: InvitationExtended;
    
    constructor(private cd: ChangeDetectorRef,
        private dialogService: DialogService,
        private invitationService: InvitationService,
        private consignmentService: ConsignmentService,
        private toastr: ToastsManager,
        private toastrService: ToastrService,
        private paymentService: PaymentService,
        private filterService: FilterService
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.activeInvitations = this.invitations != null ? this.invitations : null;
    }

    ngOnInit() {
        this.getInvitations();
    }

    private getInvitations() {
        this.invitationService.getInvitations(this.currentUser.PersonId).subscribe(res => {
            this.invitations = res;

            if (this.invitations != null)
                this.activeInvitations = this.invitations.filter(x => { return x.Status > InvitationStatusEnum.Created && x.Status < InvitationStatusEnum.ConsignmentActive });
        });
    }

    savePackageId() {
        var invitation = this.invitationExtended;

        this.invitationService.savePackageId(this.invitationExtended).subscribe(res => {
            this.cancelPackageIdForm();

            this.invitations = this.filterService.removeFromListByProperty(this.invitations, invitation);

            this.invitationService.updateInvitations(this.invitations);

            this.consignmentService.updateConsignments(res);
        });
    }

    matchesInvitationWithPackageId(invitation: InvitationExtended): boolean {
        if (this.invitationExtended == null) return false;
        
        return this.invitationExtended.Id == invitation.Id ? true : false;
    }

    packageIdFormOpened(invitation: InvitationExtended): boolean{
        return this.matchesInvitationWithPackageId(invitation);
    }

    cancelPackageIdForm() {
        this.invitationExtended = null;
    }

    enterPackageId(invitation: InvitationExtended) {
        this.cancelPackageIdForm();

        this.invitationExtended = invitation;
    }

    processPayment(invitation: InvitationExtended) {
        this.paymentService.processPayment(invitation).subscribe(res => {

            //Mock loading time -- not working properly, try setting a object with invitation Id and loading bool
            //setTimeout(() => {
            //    this.loading = false;
            //}, 3000);

            //Once payment have gone through, update the activeInvitation array
            //this.updateInvitationList(invitation, InvitationStatusEnum.AmountDeposited);
            this.filterService.updateInvitationStatus(this.invitations, invitation, InvitationStatusEnum.AmountDeposited);
        });
    }

    //updateInvitationList(invitation: InvitationExtended, newStatus: InvitationStatusEnum) {
    //    let updateInvitation = this.activeInvitations.filter(x => x.Id == invitation.Id);

    //    let index = this.activeInvitations.indexOf(updateInvitation[0]);

    //    invitation.Status = newStatus;

    //    this.activeInvitations[index] = invitation;
    //}

    HasReceiverRole(invitation: Invitation): boolean {
        return invitation.ReceiverPersonId == this.currentUser.PersonId ? true : false;
    }

    translateInvitationStatus(invite: Invitation){
        if (this.currentUser.PersonId == invite.SenderPersonId && invite.Status == InvitationStatusEnum.Accepted)
            return "Väntar på betalning från mottagaren.";
        else if (this.currentUser.PersonId == invite.SenderPersonId && invite.Status == InvitationStatusEnum.AmountDeposited)
            return "Mata in kolli-id!";
        else if (this.currentUser.PersonId == invite.ReceiverPersonId && invite.Status == InvitationStatusEnum.Accepted)
            return "Betala!"
        else if (this.currentUser.PersonId == invite.ReceiverPersonId && invite.Status == InvitationStatusEnum.AmountDeposited)
            return "Väntar på att avsändaren ska skicka paketet."
    }


    //---Pagination---
    incrementSliceValue() {
        if (this.maxSliceValue >= this.invitations.length)
            return;

        this.maxSliceValue += 4;
        this.minSliceValue += 4;
    }

    incrementSliceValueTwice() {
        this.maxSliceValue += 8;
        this.minSliceValue += 8;
    }

    decrementSliceValue() {
        if (this.minSliceValue >= 4){
            this.maxSliceValue -= 4;
            this.minSliceValue -= 4;
        }
    }

    decrementSliceValueTwice() {
        this.maxSliceValue -= 8;
        this.minSliceValue -= 8;
    }
    

    showAllInvitations() {
        this.maxSliceValue = this.invitations.length;
        this.minSliceValue = 0;

        this.showAllInvitationsEnabled = true;
    }

    maximizeSliceValue() {
        if (this.invitations.length % 4 > 0){
            this.maxSliceValue = this.invitations.length + (4 - (this.invitations.length % 4)); //Om antalet invitations inte är delbart på 4, ska den ändå visa rätt invites på sista sidan
            this.minSliceValue = this.maxSliceValue - 4;
        }
        else {
            this.maxSliceValue = this.invitations.length;
            this.minSliceValue = this.maxSliceValue - 4;
        }
    }

    resetSliceValue() {
        this.maxSliceValue = 4;
        this.minSliceValue = 0;

        this.showAllInvitationsEnabled = false;
    }
}