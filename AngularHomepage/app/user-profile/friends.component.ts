import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges  } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { DialogService } from "ng2-bootstrap-modal";
import { User, Person } from '../_models/index';
import { ConfirmComponent } from '../_dialog/confirm.component';
import { AlertService, UserService, InvitationService, ToastrService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'friends.component.html',
    selector: 'friends',
})

export class FriendsComponent implements OnInit {
    currentUser: Person;
    confirmResult: boolean = null;

    ngOnInit() {

    }

    constructor(private cd: ChangeDetectorRef,
        private dialogService: DialogService,
        private userService: UserService,
        private alertService: AlertService,
        private toastrService: ToastrService,
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    showConfirm(event: any) {
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Skicka inbjudan',
            message: 'Bla bla confirm some action?'
        })
            .subscribe((isConfirmed) => {
                //Get dialog result
                this.confirmResult = isConfirmed;

                this.toastrService.ShowToastr(isConfirmed, false, true, "Inbjudan skickades");

            });
    }
}