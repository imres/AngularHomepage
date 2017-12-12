 import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { DialogService } from "ng2-bootstrap-modal";

import { Person, Invitation, Consignment } from '../../_models/index';
import { UserService, InvitationService, ConsignmentService } from '../../_services/index';
import { ConfirmComponent } from '../../_dialog/confirm.component';
import { InviteResponseComponent } from '../../_dialog/invite-response.component';



@Component({
    moduleId: module.id,
    selector: 'consignment',
    templateUrl: 'consignment.component.html'
    //changeDetection: ChangeDetectionStrategy.OnPush
})


export class ConsignmentComponent implements OnInit {
    //@Input() public invitationStream: Invitation[];
    //invitation: Invitation = new Invitation();
    currentUser: Person;
    confirmResult: boolean = null;
    consignments: Consignment[];

    constructor(private cd: ChangeDetectorRef, private dialogService: DialogService, private consignmentService: ConsignmentService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.getConsignments();
    }

    ngOnInit() {
    }

    getConsignments() {
        this.consignmentService.getConsignments(this.currentUser.PersonId).subscribe(res => {
            this.consignments = res;
        });
    }

    showInvite(invite: Invitation) {
        console.log(invite);
    }

    showConfirm(event) {
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Skicka inbjudan',
            message: 'Bla bla confirm some action?'
        })
            .subscribe((isConfirmed) => {
                //Get dialog result
                this.confirmResult = isConfirmed;

            });
    }
}