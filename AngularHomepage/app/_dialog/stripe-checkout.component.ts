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
    selector: 'stripe-checkout',
    templateUrl: './app/_dialog/stripe-checkout.component.html',
    styles: [`#backgroundColorBlur { 
                background-color: rgba(0, 0, 0, 0.27);
                position: fixed;
                height: 100%;
                width: 100%; }`]
})

export class StripeCheckout extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel
{
    title: string;
    message: string;
    currentUser: Person;

    constructor(
        injector: Injector,
        dialogService: DialogService, private invitationService: InvitationService) {
        super(dialogService);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
