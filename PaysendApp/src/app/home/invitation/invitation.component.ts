import {
    Component, OnInit, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA,
    ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges, ViewContainerRef
} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
// import { DialogService } from "ng2-bootstrap-modal";
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Person, Invitation } from '../../_models/index';
import { UserService, InvitationService, AlertService, ToastrService, FilterService} from '../../_services/index';
// import { SendInvitationDialogComponent } from '../../_dialog/send-invitation-dialog.component';
// import { InvitationResponseDialogComponent } from '../../_dialog/invitation-response-dialog.component';
import { InvitationStatusEnum } from '../../_models/enums/index';

@Component({
    // moduleId: module.id,
    selector: 'invite-notifications',
    templateUrl: 'invitation.component.html'
    //changeDetection: ChangeDetectionStrategy.OnPush
})


export class InvitationComponent implements OnInit {
    @Input() invitations: Invitation[];
    @Input() invitationNotifications: Invitation[];

    currentUser: Person;
    confirmResult: boolean = null;
    invitationStatus = InvitationStatusEnum;

    constructor(private cd: ChangeDetectorRef,
                // private dialogService: DialogService,
                private invitationService: InvitationService,
                // private toastr: ToastsManager,
                private toastrService: ToastrService,
                private filterService: FilterService
                )
    {
    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    updateInvitationList(invitation: Invitation) {
        this.invitationService.updateInvitations(this.invitations);
    }
    
    // showInviteResponseDialog(invitation: Invitation) {

    //     this.dialogService.addDialog(InvitationResponseDialogComponent, {
    //         title: this.HasReceiverRole(invitation) ? "Mottagare" : "Avsändare",
    //         message: 'Bla bla confirm some action?',
    //         currentInvitation: invitation
    //     })
    //     .subscribe((isConfirmed) => {
    //         //Get dialog result
    //         this.confirmResult = isConfirmed;
            
    //         if (isConfirmed == null) return;

    //         this.toastrService.ShowToastr(isConfirmed, false, "Inbjudan accepterad, försändelse skapad");

    //         this.handleDialogResult(invitation, isConfirmed);

    //         this.updateInvitationList(invitation)
            
    //     });
    // }

    handleDialogResult(invitation: Invitation, isConfirmed: boolean) {
        if (isConfirmed)
            this.filterService.updateInvitationStatus(this.invitations, invitation, InvitationStatusEnum.Accepted);
        else
            this.filterService.removeFromListByProperty(this.invitations, invitation);
    }

    private HasReceiverRole(invitation: Invitation): boolean {
        if (invitation.ReceiverPersonId == this.currentUser.PersonId) {
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
                
            },
            err => console.log(err)
        );

        // this.result = false;
        // this.close();
   
    }
}