﻿import {
    Component, OnInit, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA,
    ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges, ViewContainerRef, Injectable, Injector
} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { DialogService } from "ng2-bootstrap-modal";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';

import { BasicComponent } from '../../shared/basic.component';
import { Person, Invitation, InvitationExtended, PostNordSchema, Pager } from '../../_models/index';
import { UserService, InvitationService, ConsignmentService, AlertService, ToastrService, PaymentService, FilterService, PagerService } from '../../_services/index';
import { ConfirmComponent, StripeCheckout, InviteResponseComponent  } from '../../_dialog/index';
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
export class ActiveInvitationComponent extends BasicComponent implements OnInit {
    invitations: Invitation[];
    activeInvitations: Invitation[];

    currentUser: Person;
    invitationStatus = InvitationStatusEnum;
    showPackageIdForm = false;
    unrespondedInvitations: Invitation[];
    handler: any;
    invitationToPay: InvitationExtended;

    showPopover = false;

    loadingPayment = false;
    loadingPaymentId: number;

    
    
    invitationExtended: InvitationExtended;
    
    constructor(
        injector: Injector,
        private cd: ChangeDetectorRef,
        private dialogService: DialogService,
        private invitationService: InvitationService,
        private consignmentService: ConsignmentService,
        private toastr: ToastsManager,
        private toastrService: ToastrService,
        private paymentService: PaymentService,
        private filterService: FilterService,
        private pagerService: PagerService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        super(injector)
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.activeInvitations = this.invitations != null ? this.invitations : null;
    }

    ngOnInit() {
        this.getInvitations();

        this.invitationService.invitationList.subscribe(invitations => {
            if (!invitations) return;
            this.activeInvitations = invitations.filter(x => { return x.Status > InvitationStatusEnum.Created && x.Status < InvitationStatusEnum.ConsignmentActive });
            this.orderBy('-StartDate', this.activeInvitations);
        }); 

        this.getUsers();
        this.ConfigStripeCheckout();
    }

    openCheckout(invitation: InvitationExtended) {
        this.invitationToPay = invitation;

        this.handler.open({
            name: invitation.Title,
            description: invitation.Description,
            amount: invitation.RequestedDepositAmount * 100
        });
    }

    private ConfigStripeCheckout() {
        this.handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_8KkoVLMTzkhfC13XXvKHEuMO',
            locale: 'auto',
            currency: "sek",
            token: (token: any) => {
                // You can access the token ID with `token.id`.
                // Get the token ID to your server-side code for use.
                console.log("token", token);
                this.loadingPayment = true;
                this.loadingPaymentId = this.invitationToPay.Id;

                 this.paymentService.processPayment(this.invitationToPay, token.email, token.id).subscribe(() => {
                    this.filterService.updateInvitationStatus(this.invitations, this.invitationToPay, InvitationStatusEnum.AmountDeposited);
                    this.toastrService.ShowToastr(true, false, true, "Betalning skickades!");
                    this.loadingPayment = false;
                    this.loadingPaymentId = 0;
                 });
            }
        });
    }

    private getInvitations() {
        this.invitationService.getInvitations(this.currentUser.PersonId).subscribe(res => {
            this.invitations = res;

            if (this.invitations != null)
                this.activeInvitations = this.invitations.filter(x => { return x.Status > InvitationStatusEnum.Created && x.Status < InvitationStatusEnum.ConsignmentActive });

            this.orderBy('-StartDate', this.activeInvitations);

            console.log(this.activeInvitations);
        });
    }

    savePackageId() {
        var invitation = this.invitationExtended;

        this.invitationService.savePackageId(this.invitationExtended).subscribe(res => {
            this.cancelPackageIdForm();
            console.log("savePackageId res:", res);

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

    HasReceiverRole(invitation: Invitation): boolean {
        return invitation.ReceiverPersonId == this.currentUser.PersonId ? true : false;
    }

    translatePaymentStatus(invite: Invitation){
        if (this.HasReceiverRole(invite) && invite.Status == this.invitationStatus.Accepted) {
            return 'Säljaren väntar på din betalning';
        } else if (!this.HasReceiverRole(invite) && invite.Status == this.invitationStatus.Accepted) {
            return 'Väntar på betalning från köparen';
        } else if (invite.Status == this.invitationStatus.AmountDeposited) { 
            return 'Betald';
        }
    }

    routeToUserProfile(user: Person) {
        this.router.navigate(['/user', user.PersonId])
    }

}