import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges  } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { DialogService } from "ng2-bootstrap-modal";

import { Person, Invitation } from '../_models/index';
import { UserService, InvitationService, ToastrService, ConsignmentService } from '../_services/index';
import { ConfirmComponent } from '../_dialog/confirm.component';
import { InviteResponseComponent } from '../_dialog/invite-response.component';
import { InvitationStatusEnum } from '../_models/enums/index';


@Component({
    moduleId: module.id,
    templateUrl: 'navbar-home.component.html',
    selector: 'navbar-home',
})

export class NavbarHomeComponent implements OnInit {
    invitations: Invitation[];
    invitationNotifications: Invitation[];
    currentUser: Person;
    showDialog = false;
    isClassActive: boolean;
    invitationStatus: InvitationStatusEnum = new InvitationStatusEnum;

    constructor(private userService: UserService,
        private invitationService: InvitationService,
        private cd: ChangeDetectorRef,
        private dialogService: DialogService,
        private consignmentService: ConsignmentService,
        private toastrService: ToastrService, )
    {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.isClassActive = false;
    }

    ngOnInit() {
        this.getInvitations();
    }

    newInvitationList(event: number) {
        //Method is connected to child method in order to receive event changes
        //filter current invitation list since id from event is non-existing
        this.invitationNotifications = this.invitationNotifications.filter(x => x.Id != event);
    }

    //Get invitations with all statuses, but fill seperate variables with filtered data
    getInvitations() {
        this.invitationService.getInvitations(this.currentUser.PersonId).subscribe(res => {
            console.log("Hämtade invites från API");

            this.invitations = res;
            this.invitationNotifications = this.invitations.filter(x => x.Status == this.invitationStatus.Created);

            //Update invitationService for all using components
            this.updateInvitationService(this.invitations);

        }, err => { console.log("Error: {0}", err) });
    }


    private getStoredInvitations(){
        this.invitationService.invitationList.subscribe(invitations => {
            console.log("Hämtade invites från service");
            this.invitations = invitations;
        }, err => console.log("Error {0}", err));
        
    }

    private updateInvitationService(invitations: Invitation[]) {
        console.log("Uppdaterade invites i service");
        this.invitationService.updateInvitations(invitations);
    }

    showInvite(invite: Invitation) {
        console.log(invite);
    }

    showConfirm(event: any) {
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Skicka inbjudan',
            message: 'Bla bla confirm some action?'
        })
            .subscribe((isConfirmed) => {
                //Get dialog result
                this.confirmResult = isConfirmed;

                this.toastrService.ShowToastr(isConfirmed, false, "Inbjudan skickades");

            });
    }
}