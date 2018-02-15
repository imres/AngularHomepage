import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { Person, Invitation, Consignment, PostNordSchema } from '../_models/index';
import { UserService, InvitationService } from '../_services/index';
import { InvitationStatusEnum } from '../_models/enums/index';


@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit{
    invitations: Invitation[];
    invitationNotifications: Invitation[];
    activeInvitations: Invitation[];

    postNordPackages: PostNordSchema;

    consignments: Consignment[];

    currentUser: Person;
    showDialog = false;
    isClassActive: boolean;
    invitationStatus = InvitationStatusEnum;

    constructor(private userService: UserService,
        private invitationService: InvitationService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.isClassActive = false;
    }

    ngOnInit() {
        this.userService.getPackage().subscribe((res: PostNordSchema) => {
            this.postNordPackages = res;

            console.log(res);


            var terst = this.postNordPackages.TrackingInformationResponse;
        });

        this.getInvitations();

        this.invitationService.invitationList.subscribe(invitations => {
            this.invitations = invitations;

            this.updateFilteredInvitations();
        });
    }

    updateFilteredInvitations() {
        if (this.invitations == null) return;

        this.invitationNotifications = this.invitations.filter(x => { return x.Status == InvitationStatusEnum.Created });
        this.activeInvitations = this.invitations.filter(x => { return x.Status > InvitationStatusEnum.Created && x.Status < InvitationStatusEnum.ConsignmentActive });
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
}