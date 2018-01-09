import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { Person, Invitation, Consignment } from '../_models/index';
import { UserService, InvitationService, ConsignmentService } from '../_services/index';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit{
    activeInvitations: Invitation[];
    consignments: Consignment[];
    currentUser: Person;
    showDialog = false;
    isClassActive: boolean;

    constructor(private userService: UserService,
                private invitationService: InvitationService,
                private consignmentService: ConsignmentService,) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.isClassActive = false;
    }

    ngOnInit() {
        this.getUnrespondedInvitations();
        this.getConsignments();
    }

    private getUnrespondedInvitations() {
        this.invitationService.getUnrespondedInvitations(this.currentUser.PersonId).subscribe(res => {
            this.activeInvitations = res;
        });
    }

    getConsignments() {
        this.consignmentService.getConsignments(this.currentUser.PersonId).subscribe(res => {
            this.consignments = res;
        });
    }
}