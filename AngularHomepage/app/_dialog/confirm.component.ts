import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Person, Invitation } from '../_models/index';
import { UserService, InvitationService } from '../_services/index';

export interface ConfirmModel {
    title: string;
    message: string;
}

export class RoleOption {
    public Value: number;
    public Text: string;
}

@Component({
    selector: 'confirm',
    templateUrl: './app/_dialog/confirm.component.html',
    styles: [`#backgroundColorBlur { 
                background-color: rgba(0, 0, 0, 0.27);
                position: fixed;
                height: 100%;
                width: 100%; }`]
})

export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    title: string;
    message: string;
    model: Invitation = new Invitation();
    selectedRole: RoleOption = new RoleOption();
    roles: { value: number, text: string }[] = [
        { "value": 1, "text": "Avsändare" },
        { "value": 2, "text": "Mottagare" }
    ];

    constructor(dialogService: DialogService, private invitationService: InvitationService) {
        super(dialogService);
    }

    public sendInvite() {
        this.invitationService.sendInvite(this.model)
            .subscribe(res => {
                console.log(res);
        });
    }

    resetModel() {
        this.model = new Invitation();
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
