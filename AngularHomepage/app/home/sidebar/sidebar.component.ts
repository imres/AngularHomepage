import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { Person, Invitation } from '../../_models/index';
import { UserService, InvitationService } from '../../_services/index';
import { InvitationStatusEnum } from '../../_models/enums/index';


@Component({
    moduleId: module.id,
    templateUrl: 'sidebar.component.html',
    selector: 'sidebar',
})

export class SidebarComponent implements OnInit {

    currentUser: Person;
    sidebarActive = true;

    constructor(private userService: UserService,
        private invitationService: InvitationService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {

    }
}