import { Component, ViewContainerRef } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Person, Invitation } from '../_models/index';
import { UserService, InvitationService, ConsignmentService, AlertService } from '../_services/index';
import { InvitationRole, CommonObject, PaymentMethod } from '../_models/index';

export interface ConfirmModel {
    title: string;
    message: string;
}

@Component({
    selector: 'invite-response',
    templateUrl: './app/_dialog/invite-response.component.html',
    styles: [`#backgroundColorBlur { 
                background-color: rgba(0, 0, 0, 0.27);
                position: fixed;
                height: 100%;
                width: 100%; }`]
})

export class InviteResponseComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    title: string;
    message: string;
    model: Invitation = new Invitation();
    currentInvite: Invitation;


    currentUser: Person;
    isReceiver: boolean = null;

    constructor(dialogService: DialogService, private invitationService: InvitationService, private consignmentService: ConsignmentService,
        private alertService: AlertService,
        public toastr: ToastsManager, vcr: ViewContainerRef) {

        super(dialogService);

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.invitationService.currentInvite.subscribe(invite => this.currentInvite = invite);
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
            //this.isReceiver = true;
            return true;
        } else {
            //this.isReceiver = false;
            return false;
        }
    }

    resetModel() {
        this.model = new Invitation();
    }

    acceptInvitation(invite: Invitation) {
        // on click on confirm button we set dialog result as true,
        // ten we can get dialog result from caller code

        this.consignmentService.acceptInvite(invite)
            .subscribe(res => {
                console.log(res);
        });

        this.result = true;
        this.close();
    }
    cancel() {
        //Skicka till service och ta bort invite, kalla på toastr på success

        this.invitationService.endInvite(this.currentInvite.Id).subscribe(
            res => console.log(res),
            err => console.log(err)
        );

        this.result = false;
        this.close();
    }
}
