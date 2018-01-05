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



@Component({
    moduleId: module.id,
    selector: 'invite-notifications',
    templateUrl: 'invitation.component.html'
    //changeDetection: ChangeDetectionStrategy.OnPush
})


export class InvitationComponent implements OnInit {
    @Input() invitations: Invitation[]; //Array data received from parent
    @Output() invitationsChanged: EventEmitter<number> = new EventEmitter<number>(); //Push change once emit is called on this object

    currentUser: Person;
    confirmResult: boolean = null;
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

    setInvitations() {
        //Get the last invitation interaction and emit the id to parent
        this.invitationService.currentInvite.subscribe(res => {
            this.invitationsChanged.emit(res.Id);
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
            
            if (isConfirmed == null) return;

            this.toastrService.ShowToastr(isConfirmed, false, "Inbjudan accepterad, försändelse skapad");

            this.setInvitations();
            
        });

        this.invitationService.changeInviteData(invite);
        this.HasReceiverRole(invite);
        
        //this.invitationService.currentInvite.subscribe(invite => this.currentInvite = invite);
    }

    private getStoredInvitations() {
        this.invitationService.invitationList.subscribe(invitations => {
            console.log("Hämtade invites från service");
            this.invitations = invitations;
        });
    }

    private HasReceiverRole(invite: Invitation): boolean {
        if (invite.ReceiverPersonId == this.currentUser.PersonId) {
            return true;
        } else {
            return false;
        }
    }
}