import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { DialogService } from "ng2-bootstrap-modal";

import { Person, Invitation } from '../../_models/index';
import { UserService, InvitationService } from '../../_services/index';
import { ConfirmComponent } from '../../_dialog/confirm.component';
import { InviteResponseComponent } from '../../_dialog/invite-response.component';



@Component({
    moduleId: module.id,
    selector: 'invite',
    templateUrl: 'invitation.component.html'
    //changeDetection: ChangeDetectionStrategy.OnPush
})


export class InvitationComponent implements OnInit {
    //@Input() public invitationStream: Invitation[];
    //invitation: Invitation = new Invitation();
    currentUser: Person;
    confirmResult: boolean = null;
    invitations: Invitation[];

    constructor(private cd: ChangeDetectorRef, private dialogService: DialogService, private invitationService: InvitationService)
    {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.getInvitations();
    }

    ngOnInit() {
    }

    getInvitations() {
        this.invitationService.getInvitations(this.currentUser.PersonId).subscribe(res => {
            this.invitations = res;
        });
    }

    showConfirm() {
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Skicka inbjudan',
            message: 'Bla bla confirm some action?'
        })
        .subscribe((isConfirmed) => {
            //Get dialog result
            this.confirmResult = isConfirmed;
        });
    }

    showInviteResponseDialog(invite: Invitation) {
        this.dialogService.addDialog(InviteResponseComponent, {
            title: this.HasReceiverRole(invite) ? "Mottagare" : "Avsändare",
            message: 'Bla bla confirm some action?'
        })
        .subscribe((isConfirmed) => {
            //Get dialog result
            this.confirmResult = isConfirmed;
            });

        this.invitationService.changeInviteData(invite);
        this.HasReceiverRole(invite);
        //this.invitationService.currentInvite.subscribe(invite => this.currentInvite = invite);
    }

    HasReceiverRole(invite: Invitation): boolean {
        if (invite.ReceiverPersonId == this.currentUser.PersonId) {
            return true;
        } else {
            return false;
        }
    }

    showInvite(invite: Invitation) {
        console.log(invite);
    }
}