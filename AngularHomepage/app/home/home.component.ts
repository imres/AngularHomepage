import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { Person, Invitation } from '../_models/index';
import { UserService, InvitationService } from '../_services/index';
import { InvitationStatusEnum } from '../_models/enums/index';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit{
    invitations: Invitation[];
    activeInvitations: Invitation[];
    inactiveInvitations: Invitation[];

    currentUser: Person;
    showDialog = false;
    isClassActive: boolean;
    invitationStatus: InvitationStatusEnum = new InvitationStatusEnum;

    constructor(private userService: UserService,
                private invitationService: InvitationService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.isClassActive = false;
    }

    ngOnInit() {

        this.getInvitations();
    }

    newInvitationList(event: any) {
        //Method is connected to child method in order to receive event changes
        //filter current invitation list since id from event is non-existing
        this.activeInvitations = this.activeInvitations.concat(event.invite);
    }

    getInvitations() {
        this.invitationService.getInvitations(this.currentUser.PersonId).subscribe(res => {
            console.log("Hämtade invites från API");

            if (res == null) return;

            this.invitations = res;
            this.activeInvitations = res.filter(x => x.Status > this.invitationStatus.Created);
            this.inactiveInvitations = res.filter(x => x.Status == this.invitationStatus.Created);

            //Update invitationService for all using components
            this.updateInvitationService(res);

        }, err => { console.log("Error: {0}", err) });
    }

    private updateInvitationService(invitations: Invitation[]) {
        console.log("Uppdaterade invites i service");
        this.invitationService.updateInvitations(invitations);
    }
    
}