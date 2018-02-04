import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { Person, Invitation, Consignment } from '../../_models/index';
import { UserService, InvitationService } from '../../_services/index';
import { InvitationStatusEnum } from '../../_models/enums/index';


@Component({
    moduleId: module.id,
    templateUrl: 'admin-panel.component.html'
})

export class AdminPanel implements OnInit {
    currentUser: Person;

    constructor(private userService: UserService,
        private invitationService: InvitationService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
    }
    
}