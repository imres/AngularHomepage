import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { Person, Invitation } from '../_models/index';
import { UserService, InvitationService } from '../_services/index';


@Component({
    moduleId: module.id,
    templateUrl: 'navbar-home.component.html',
    selector: 'navbar-home',
})

export class NavbarHomeComponent implements OnInit {
    invitations: Invitation[];
    currentUser: Person;
    showDialog = false;
    isClassActive: boolean;

    constructor(private userService: UserService,
        private invitationService: InvitationService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.isClassActive = false;
    }

    ngOnInit() {
        this.getInvitations();
    }

    newInvitationList(event: number) {
        //Method is connected to child method in order to receive event changes
        //filter current invitation list since id from event is non-existing
        this.invitations = this.invitations.filter(x => x.Id != event);
    }

    getInvitations() {
        this.invitationService.getInvitations(this.currentUser.PersonId).subscribe(res => {
            console.log("Hämtade invites från API");

            this.invitations = res;

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


}