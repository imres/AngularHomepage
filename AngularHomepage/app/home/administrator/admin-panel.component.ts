import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { Person, Invitation, Consignment } from '../../_models/index';
import { UserService, AdministratorService } from '../../_services/index';
import { InvitationStatusEnum } from '../../_models/enums/index';


@Component({
    moduleId: module.id,
    templateUrl: 'admin-panel.component.html',
    selector: 'admin-panel',
})

export class AdminPanel implements OnInit {
    currentUser: Person;

    modelList = [Person.name, Invitation.name, Consignment.name]; //If model is added here, it will appear on admin page

    constructor(private userService: UserService,
        private administratorService: AdministratorService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
    }


    //Läs mer om hur jag lägger till checkmark efter klick http://www.angulartutorial.net/2017/04/add-class-to-active-element-angular-2.html
    cleanTable(modelName: string) {
        if (window.confirm(`Är du säker att du vill rensa tabellen ${modelName} ?`)) {
            this.administratorService.cleanTable(modelName).subscribe(res => {

            }, err => console.log(err));
        }
    }
    
}