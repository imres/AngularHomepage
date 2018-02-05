import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { Person, Invitation, Consignment } from '../_models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'user-settings.component.html'
})

export class UserSettingsComponent implements OnInit {

    currentUser: Person;

    ngOnInit() {

    }
}