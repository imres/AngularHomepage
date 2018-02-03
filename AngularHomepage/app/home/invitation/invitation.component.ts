import {
    Component, OnInit, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA,
    ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, ViewContainerRef
} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { DialogService } from "ng2-bootstrap-modal";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Person, Invitation } from '../../_models/index';
import { UserService, InvitationService, AlertService, ToastrService} from '../../_services/index';
import { ConfirmComponent } from '../../_dialog/confirm.component';
import { InviteResponseComponent } from '../../_dialog/invite-response.component';
import { InvitationStatusEnum } from '../../_models/enums/index';

@Component({
    moduleId: module.id,
    selector: 'invite-notifications',
    templateUrl: 'invitation.component.html'
    //changeDetection: ChangeDetectionStrategy.OnPush
})


export class InvitationComponent implements OnInit {
    @Input() invitations: Invitation[]; //Array data received from parent
    @Output() invitationsChanged: EventEmitter<any> = new EventEmitter<any>(); //Push change once emit is called on this object

    currentUser: Person;
    currentInvite: Invitation;
    confirmResult: boolean = null;
    invitationStatus = InvitationStatusEnum;
    currentInvitation: Invitation;
    //invitations: Invitation[];

    constructor(private cd: ChangeDetectorRef,
                private dialogService: DialogService,
                private invitationService: InvitationService,
                private toastr: ToastsManager,
                private toastrService: ToastrService
                )
    {
    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //this.getStoredInvitations();
    }

    updateActiveInvitationList(inviteAccepted: boolean) {
        //Get the last invitation interaction and emit the id to parent
        //Update status from created to accepted
        //Update currentInvite with new status

        var invite = this.currentInvitation;
        
        if (inviteAccepted)
            invite.Status = InvitationStatusEnum.Accepted;

        this.invitationsChanged.emit({ invite, inviteAccepted });
    }
    
    showInviteResponseDialog(invite: Invitation) {
        this.currentInvitation = invite;

        this.dialogService.addDialog(InviteResponseComponent, {
            title: this.HasReceiverRole(invite) ? "Mottagare" : "Avsändare",
            message: 'Bla bla confirm some action?',
            currentInvitation: invite
        })
        .subscribe((isConfirmed) => {
            //Get dialog result
            this.confirmResult = isConfirmed;
            
            if (isConfirmed == null) return;

            this.toastrService.ShowToastr(isConfirmed, false, "Inbjudan accepterad, försändelse skapad");

            this.updateActiveInvitationList(isConfirmed);
            
        });
    }

    private HasReceiverRole(invite: Invitation): boolean {
        if (invite.ReceiverPersonId == this.currentUser.PersonId) {
            return true;
        } else {
            return false;
        }
    }

    cancel(invite: Invitation) {
        //Skicka till service och ta bort invite, kalla på toastr på success
        var inviteAccepted = false;

        this.invitationService.endInvite(invite.Id).subscribe(
            res => {
                this.invitationsChanged.emit({ invite, inviteAccepted });
            },
            err => console.log(err)
        );

        this.result = false;
        this.close();
    }
}