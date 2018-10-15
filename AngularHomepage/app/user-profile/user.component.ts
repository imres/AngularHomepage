import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Person } from '../_models/index';
import { UserService } from '../_services/index';


@Component({
    moduleId: module.id,
    templateUrl: 'user.component.html',
})

export class UserComponent implements OnInit {
    currentUser: Person;
    users: Person[];
    selectedUser: Person[];
    selectedUserPersonId: string;

    constructor(private userService: UserService,
        private activatedRoute: ActivatedRoute) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.getAllUsers();
    }

    getAllUsers() {
        this.userService.getAllUsers().subscribe(res => {
            this.users = res;

            this.getSelectedUserId();
        });
    }

    getSelectedUserId() {
        //this.selectedUserPersonId = this.activatedRoute.snapshot.params['PersonId'];

        this.activatedRoute.params.subscribe(res => {
            this.selectedUserPersonId = res.PersonId;
            this.getSelectedUser();
        });
    }

    getSelectedUser() {
        this.selectedUser = this.users.filter(x => { return x.PersonId == this.selectedUserPersonId });
    }
}