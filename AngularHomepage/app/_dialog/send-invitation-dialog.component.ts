import { Component, Injector } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Person, Invitation } from '../_models/index';
import { UserService, InvitationService } from '../_services/index';
import { InvitationRole, CommonObject, PaymentMethod } from '../_models/index';

export interface ConfirmModel {
    title: string;
    message: string;
}

@Component({
    selector: 'confirm',
    templateUrl: './app/_dialog/send-invitation-dialog.component.html',
    styles: [`#backgroundColorBlur {
                background-color: rgba(0, 0, 0, 0.27);
                position: fixed;
                height: 100%;
                width: 100%; }`]
})

export class SendInvitationDialogComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    title:string;
    message:string;
    model: Invitation = new Invitation();
    invitationRoles = new InvitationRole();
    selectedRole = 0;
    payment = new PaymentMethod();
    selectedPaymentMethod = 0;
    currentUser: Person;
    dialogStep = 1;
    samePersonId = false;
    showCustomAddress = false;

    constructor(
        injector: Injector,
        dialogService: DialogService,
        private invitationService: InvitationService
    ) {
        super(dialogService);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    public sendInvite() {
        this.setPersonId();

        if (this.model.SenderPersonId != this.model.ReceiverPersonId) {
            this.samePersonId = false;

            if (!this.model.DeliveryAddress) {
                this.model.DeliveryAddress = this.currentUser.Address;
                this.model.DeliveryPostalCode = this.currentUser.PostalCode;
                this.model.DeliveryCity = this.currentUser.City;
            }

            this.invitationService.sendInvite(this.model).subscribe(res => {
                this.confirm();
            });
        }
        else {
            this.result = false;
            this.samePersonId = true;
        }
            
        this.dialogStep = 1;
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

    customAddressRadio(event: any) {
        if (event == 'option2') {
            return this.showCustomAddress = true;
        }

        if (event == 'option1') {
            return this.showCustomAddress = false;
        }
    }

    resetModel() {
        this.model = new Invitation();
        this.dialogStep = 1;
    }

    confirm() {
        // on click on confirm button we set dialog result as true,
        // ten we can get dialog result from caller code
        this.result = true;
        this.close();
    }
    cancel() {
        this.result = false;
        this.close();
    }
}
