import { Component, ViewContainerRef, Injector, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Person, Invitation } from '../_models/index';
import { UserService, InvitationService, ConsignmentService, AlertService } from '../_services/index';
import { InvitationRole, CommonObject, PaymentMethod } from '../_models/index';

export interface ConfirmModel {
    title: string;
    message: string;
    currentInvitation: Invitation;
}

@Component({
    selector: 'invite-response',
    templateUrl: './app/_dialog/invitation-response-dialog.component.html',
    styles: [`#backgroundColorBlur { 
                background-color: rgba(0, 0, 0, 0.27);
                position: fixed;
                height: 100%;
                width: 100%; }`]
})

export class InvitationResponseDialogComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
    title: string;
    message: string;
    model: Invitation = new Invitation();
    currentInvitation: Invitation;

    currentUser: Person;
    isReceiver: boolean = null;
    dialogStep = 1;
    showCustomAddress = false;

    constructor(
        injector: Injector,
        dialogService: DialogService,
        private invitationService: InvitationService,
        private consignmentService: ConsignmentService,
        private alertService: AlertService,
        public toastr: ToastsManager, vcr: ViewContainerRef) {

        super(dialogService);

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.currentInvitation.ReceiverPhoneNumber = this.currentUser.PhoneMobile;
    }

    private setPersonId() {
        //If one role have person id set, use currentuser to fill other
        if (this.model.ReceiverPersonId != null && this.model.ReceiverPersonId.length > 0) {
            this.model.SenderPersonId = this.currentUser.PersonId;
        } else {
            this.model.ReceiverPersonId = this.currentUser.PersonId;
        }

        this.model.InvitationInitiatorPersonId = this.currentUser.PersonId;
    }

    HasReceiverRole(invite: Invitation): boolean {
        if (invite.ReceiverPersonId == this.currentUser.PersonId) {
            return true;
        } else {
            return false;
        }
    }

    resetModel() {
        this.model = new Invitation();
        this.dialogStep = 1;
    }

    customAddressRadio(event: any) {
        if (event == 'option2') {
            return this.showCustomAddress = true;
        }
            
        if (event == 'option1') {
            return this.showCustomAddress = false;
        }
    }

    acceptInvitation(invite: Invitation) {
        // on click on confirm button we set dialog result as true,
        // then we can get dialog result from caller code
        if (!invite.DeliveryAddress) {
            invite.DeliveryAddress = this.currentUser.Address;
            invite.DeliveryPostalCode = this.currentUser.PostalCode;
            invite.DeliveryCity = this.currentUser.City;
        }

        this.invitationService.acceptInvite(invite).subscribe(res => {
            console.log(res);
        });

        this.result = true;
        this.close();
    }

    cancel() {
        this.invitationService.endInvite(this.currentInvitation.Id).subscribe(
            res => console.log(res),
            err => console.log(err)
        );

        this.result = false;
        this.close();
    }
}
