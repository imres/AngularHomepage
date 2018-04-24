﻿import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { DialogService } from "ng2-bootstrap-modal";

import { Person, Invitation, Consignment, ActiveConsignment } from '../../_models/index';
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
<<<<<<< HEAD
    consignments: Consignment[];
    archivedConsignments: Consignment[];
    activeConsignments: Consignment[];
=======
    consignments: ActiveConsignment[];
>>>>>>> d6085a5bc0fa9906e5fb09399a93e0996276ee8d

    currentUser: Person;
    confirmResult: boolean = null;
    maxSliceValue = 4;
    minSliceValue = 0;
    showAllConsignmentsEnabled = false;
    showConsignments = true;
<<<<<<< HEAD
    //toggleArchivedConsignments = false;
=======
    loading = false;
>>>>>>> d6085a5bc0fa9906e5fb09399a93e0996276ee8d

    constructor(private cd: ChangeDetectorRef,
        private dialogService: DialogService,
        private consignmentService: ConsignmentService,
        private toastrService: ToastrService,

    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
    }

    ngOnInit() {
        this.getActiveConsignments();

        this.consignmentService.consignmentList.subscribe(consignments => {
            if (!this.consignments) return;

            this.consignments = this.consignments.concat(consignments);
        });

        
    }

<<<<<<< HEAD
    getActiveConsignments() {
=======
    getConsignments() {

        this.loading = true;
>>>>>>> d6085a5bc0fa9906e5fb09399a93e0996276ee8d
        this.consignmentService.getConsignments(this.currentUser.PersonId).subscribe(res => {
            this.activeConsignments = res;
            this.consignments = res;

            this.loading = false;

            console.log(res);
        });
    }

    getArchivedConsignments() {
        this.consignmentService.getArchivedConsignments(this.currentUser.PersonId).subscribe((res: any) => {
            this.archivedConsignments = res;
            this.consignments = this.consignments.concat(this.archivedConsignments);
            //this.consignments = this.consignments.concat(res);
        });
    }

    toggleArchivedConsignments(event: any) {
        if (event.srcElement.checked)
            this.archivedConsignmentsHasValue();
        else 
            this.consignments = this.activeConsignments;
    }

    archivedConsignmentsHasValue() {
        if (this.archivedConsignments != null)
        {
            this.consignments = this.consignments.concat(this.archivedConsignments);
        }
        else
        {
            this.getArchivedConsignments();
            console.log("Arkiverade hämtat från API");
        }
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

                this.toastrService.ShowToastr(isConfirmed, false, true, "Inbjudan skickades");

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