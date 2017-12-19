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

    getInvitations() {
        this.invitationService.getInvitations(this.currentUser.PersonId).subscribe(res => {
            this.invitations = res;
        });
    }


}