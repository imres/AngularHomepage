import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { DialogService } from "ng2-bootstrap-modal";

import { Person, Invitation } from '../../_models/index';
import { UserService, InvitationService, ToastrService, ConsignmentService } from '../../_services/index';
import { ConfirmComponent } from '../../_dialog/confirm.component';
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
        private dialogService: DialogService,
        private invitationService: InvitationService,
        private toastrService: ToastrService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {

    }

    showConfirm(event: any) {
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Skicka inbjudan',
            message: 'Bla bla confirm some action?'
        })
            .subscribe((isConfirmed) => {
                //Get dialog result
                this.confirmResult = isConfirmed;

                this.toastrService.ShowToastr(isConfirmed, false, "Inbjudan skickades");

            });
    }
}