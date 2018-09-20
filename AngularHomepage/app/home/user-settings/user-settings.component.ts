import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { User, Person } from '../../_models/index';

import { AlertService, UserService } from '../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'user-settings.component.html',
    selector: 'user-settings',
})

export class UserSettingsComponent implements OnInit {
    currentUser: Person;
    model: User = new User;
    editActive: false;

    ngOnInit() {
        
    }

    constructor(
        private userService: UserService,
        private alertService: AlertService,
                ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    updateAccount() {
        this.userService.update(this.currentUser).subscribe(res => {
            this.currentUser = res;
        });

        this.editActive = false;
    }
}