import {
    Component, OnInit, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA,
    ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, ViewContainerRef, Injectable
} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { DialogService } from "ng2-bootstrap-modal";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Person, Invitation, InvitationExtended } from '../../_models/index';
import { UserService, InvitationService, AlertService, ToastrService, PaymentService, FilterService } from '../../_services/index';
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
    @Input() activeInvitations: InvitationExtended[];
    
    currentUser: Person;
    //unrespondedInvitations: Invitation[];
    maxSliceValue = 4;
    minSliceValue = 0;
    invitationStatus = InvitationStatusEnum;
    showInvitations = true;
    showAllInvitationsEnabled = false;
    showPackageIdForm = false;

    loading = false;
    
    invitationExtended: InvitationExtended;
    
    constructor(private cd: ChangeDetectorRef,
        private dialogService: DialogService,
        private invitationService: InvitationService,
        private toastr: ToastsManager,
        private toastrService: ToastrService,
        private paymentService: PaymentService,
        private filterService: FilterService
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
    }

    savePackageId() {
        var invitation = this.invitationExtended;

        this.invitationService.savePackageId(this.invitationExtended).subscribe(res => {
            this.cancelPackageIdForm();

            this.activeInvitations = this.filterService.removeFromListByProperty(this.activeInvitations, invitation);
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
        this.loading = true;

        this.paymentService.processPayment(invitation).subscribe(res => {

            //Mock loading time -- not working properly, try setting a object with invitation Id and loading bool
            //setTimeout(() => {
            //    this.loading = false;
            //}, 3000);

            //Once payment have gone through, update the activeInvitation array
            //this.updateInvitationList(invitation, InvitationStatusEnum.AmountDeposited);
            this.filterService.updateInvitationStatus(this.activeInvitations, invitation, InvitationStatusEnum.AmountDeposited);
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
        if (this.maxSliceValue >= this.activeInvitations.length)
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
        this.maxSliceValue = this.activeInvitations.length;
        this.minSliceValue = 0;

        this.showAllInvitationsEnabled = true;
    }

    maximizeSliceValue() {
        if (this.activeInvitations.length % 4 > 0){
            this.maxSliceValue = this.activeInvitations.length + (4 - (this.activeInvitations.length % 4)); //Om antalet invitations inte är delbart på 4, ska den ändå visa rätt invites på sista sidan
            this.minSliceValue = this.maxSliceValue - 4;
        }
        else {
            this.maxSliceValue = this.activeInvitations.length;
            this.minSliceValue = this.maxSliceValue - 4;
        }
    }

    resetSliceValue() {
        this.maxSliceValue = 4;
        this.minSliceValue = 0;

        this.showAllInvitationsEnabled = false;
    }
}