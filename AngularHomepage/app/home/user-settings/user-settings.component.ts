import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { Person } from '../../_models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'user-settings.component.html',
    selector: 'user-settings',
})

export class UserSettingsComponent implements OnInit {

    currentUser: Person;

    ngOnInit() {
        
    }

    constructor(){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
}