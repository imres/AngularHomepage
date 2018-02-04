import { Component, Input, Output, EventEmitter, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges  } from '@angular/core';
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
    selector: 'navbar-home'
})

export class NavbarHomeComponent implements OnInit, OnChanges {
    @Input() invitations: Invitation[];
    @Input() invitationNotifications: Invitation[];
    //@Output() invitationsChanged: EventEmitter<any> = new EventEmitter<any>(); //Push change once emit is called on this object

    //invitations: Invitation[];
    //invitationNotifications: Invitation[];
    currentUser: Person;
    showDialog = false;
    isClassActive: boolean;
    invitationStatus = InvitationStatusEnum

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

        this.invitationService.invitationList.subscribe(invitations => {
            this.invitations = invitations;

            this.updateFilteredInvitations();
        });
    }

    updateFilteredInvitations() {
        if (this.invitations == null) return;

        this.invitationNotifications = this.invitations.filter(x => { return x.Status == InvitationStatusEnum.Created });
    }

    getInvitations() {
        this.invitationService.getInvitations(this.currentUser.PersonId).subscribe(invitations => {
            console.log("Hämtade invites från API");

            if (invitations == null) return;

            this.invitations = invitations;

            //this.updateFilteredInvitations();

            this.invitationService.updateInvitations(invitations);

        }, err => { console.log("Error: {0}", err) });
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