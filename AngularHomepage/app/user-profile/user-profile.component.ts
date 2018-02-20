import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { Person} from '../_models/index';
import { UserService} from '../_services/index';


@Component({
    moduleId: module.id,
    templateUrl: 'user-profile.component.html',
})

export class UserProfileComponent implements OnInit {
    currentUser: Person;

    constructor(private userService: UserService,) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
    }
}