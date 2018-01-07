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

    private getInvitations() {
        this.invitationService.invitationList.subscribe(invitations => {
            if (!invitations) return;

            this.invitations = invitations;
            this.activeInvitations = this.invitations.filter(x => x.Status >= this.invitationStatus.Accepted);
            //this.invitationNotifications = this.invitations.filter(x => x.Status == this.invitationStatus.Created);
        });
    }
}