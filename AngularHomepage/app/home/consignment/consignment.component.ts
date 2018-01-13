 import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { DialogService } from "ng2-bootstrap-modal";

import { Person, Invitation, Consignment } from '../../_models/index';
import { UserService, InvitationService, ConsignmentService, ToastrService } from '../../_services/index';
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
    maxSliceValue = 4;
    minSliceValue = 0;
    showAllConsignmentsEnabled = false;

    constructor(private cd: ChangeDetectorRef,
        private dialogService: DialogService,
        private consignmentService: ConsignmentService,
        private toastrService: ToastrService,

    ) {
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

    incrementSliceValue() {
        if (this.maxSliceValue >= this.consignments.length)
            return;

        this.maxSliceValue += 4;
        this.minSliceValue += 4;
    }

    incrementSliceValueTwice() {
        this.maxSliceValue += 8;
        this.minSliceValue += 8;
    }

    decrementSliceValue() {
        if (this.minSliceValue >= 4) {
            this.maxSliceValue -= 4;
            this.minSliceValue -= 4;
        }
    }

    decrementSliceValueTwice() {
        this.maxSliceValue -= 8;
        this.minSliceValue -= 8;
    }

    //multiplySliceValue() {
    //    this.maxSliceValue = this.paginationNumber * 10;
    //}

    showAllConsignments() {
        this.maxSliceValue = this.consignments.length;
        this.minSliceValue = 0;

        this.showAllConsignmentsEnabled = true;
    }

    maximizeSliceValue() {
        if (this.consignments.length % 4 > 0) {
            this.maxSliceValue = this.consignments.length + (4 - (this.consignments.length % 4)); //Om antalet invitations inte är delbart på 4, ska den ändå visa rätt invites på sista sidan
            this.minSliceValue = this.maxSliceValue - 4;
        }
        else {
            this.maxSliceValue = this.consignments.length;
            this.minSliceValue = this.maxSliceValue - 4;
        }
    }

    resetSliceValue() {
        this.maxSliceValue = 4;
        this.minSliceValue = 0;

        this.showAllConsignmentsEnabled = false;
    }

    //multiplySliceValue(pageNumber) {
    //    this.maxSliceValue = pageNumber * 4;
    //}
}