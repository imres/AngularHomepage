import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { Person, Invitation } from '../_models/index';
import { UserService } from '../_services/index';


@Component({
    moduleId: module.id,
    selector: 'navbar-front',
    templateUrl: 'navbar.component.html',
})

export class NavbarComponent{

    constructor(private userService: UserService) {

        
    }



}