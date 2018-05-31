import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { DialogService } from "ng2-bootstrap-modal";

import { Person, Invitation, Consignment, ActiveConsignment, Pager} from '../../_models/index';
import { UserService, InvitationService, ConsignmentService, ToastrService, PagerService } from '../../_services/index';
import { ConfirmComponent } from '../../_dialog/confirm.component';
import { InviteResponseComponent } from '../../_dialog/invite-response.component';


@Component({
    moduleId: module.id,
    selector: 'consignment',
    templateUrl: 'consignment.component.html'
    //changeDetection: ChangeDetectionStrategy.OnPush
})


export class ConsignmentComponent implements OnInit {
    archivedConsignments: ActiveConsignment[];
    activeConsignments: ActiveConsignment[];
    consignments: ActiveConsignment[];
    // pager object
    pager: any = {};

    // paged items
    pagedItems: ActiveConsignment[];

    currentUser: Person;
    confirmResult: boolean = null;
    maxSliceValue = 4;
    minSliceValue = 0;
    filteringSliceValue = 4;
    showAllConsignmentsEnabled = false;
    showConsignments = true;
    loading = false;

    constructor(private cd: ChangeDetectorRef,
        private dialogService: DialogService,
        private consignmentService: ConsignmentService,
        private toastrService: ToastrService,
        private pagerService: PagerService,

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

    getActiveConsignments() {
        this.loading = true;
        this.consignmentService.getConsignments(this.currentUser.PersonId).subscribe(res => {
            this.activeConsignments = res;
            this.consignments = res;

            this.loading = false;

            console.log(res);

            // initialize to page 1
            this.setPage(1);
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

    //showOnlyArchivedConsignments(event: any) {
    //    if (event.srcElement.checked)
    //        this.onlyArchivedConsignments();
    //    else
    //        this.consignments = this.activeConsignments;
    //}

    //onlyArchivedConsignments() {
    //    if (this.archivedConsignments != null) {
    //        this.consignments = this.archivedConsignments;
    //    }
    //    else {
    //        this.getOnlyArchivedConsignments();
    //    }
    //}

    getOnlyArchivedConsignments(){
        this.consignmentService.getArchivedConsignments(this.currentUser.PersonId).subscribe((res: any) => {
            this.archivedConsignments = res;
            this.consignments = this.archivedConsignments;
            //this.consignments = this.consignments.concat(res);
        });
    }

    setPage(Page: number) {
        if (Page < 1 || Page > this.pager.TotalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.consignments.length, Page);

        // get current page of items
        this.pagedItems = this.consignments.slice(this.pager.StartIndex, this.pager.EndIndex + 1);
    }

    //filteringNumberOfConsignments(event: any) {
    //    if (event.srcElement.value == 'option1'){
    //        this.filteringSliceValue = 2;
    //        this.maxSliceValue = this.filteringSliceValue;
    //        this.showAllConsignmentsEnabled = false;
    //    }
    //    if (event.srcElement.value == 'option2') {
    //        this.filteringSliceValue = 4;
    //        this.maxSliceValue = this.filteringSliceValue;
    //        this.showAllConsignmentsEnabled = false;
    //    }
    //    if (event.srcElement.value == 'option3') {
    //        this.filteringSliceValue = 6;
    //        this.maxSliceValue = this.filteringSliceValue;
    //        this.showAllConsignmentsEnabled = false;
    //    }
    //    if (event.srcElement.value == 'option4') {
    //        this.filteringSliceValue = 8;
    //        this.maxSliceValue = this.filteringSliceValue;
    //        this.showAllConsignmentsEnabled = false;
    //    }
    //    if (event.srcElement.value == 'option5') {
    //        this.filteringSliceValue = 10;
    //        this.maxSliceValue = this.filteringSliceValue;
    //        this.showAllConsignmentsEnabled = false;
    //    }
    //    if (event.srcElement.value == 'option6') {
    //        this.showAllConsignments();
    //    }
    //}

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

    //incrementSliceValue() {
    //    if (this.maxSliceValue >= this.consignments.length)
    //        return;

    //    this.maxSliceValue += this.filteringSliceValue;
    //    this.minSliceValue += this.filteringSliceValue;
    //}

    //incrementSliceValueTwice() {
    //    this.maxSliceValue += (2 * this.filteringSliceValue);
    //    this.minSliceValue += (2 * this.filteringSliceValue);
    //}

    //decrementSliceValue() {
    //    if (this.minSliceValue >= this.filteringSliceValue) {
    //        this.maxSliceValue -= this.filteringSliceValue;
    //        this.minSliceValue -= this.filteringSliceValue;
    //    }
    //}

    //decrementSliceValueTwice() {
    //    this.maxSliceValue -= (2 * this.filteringSliceValue);
    //    this.minSliceValue -= (2 * this.filteringSliceValue);
    //}

    //showAllConsignments() {
    //    this.maxSliceValue = this.consignments.length;
    //    this.minSliceValue = 0;

    //    this.showAllConsignmentsEnabled = true;
    //}

    //maximizeSliceValue() {
    //    if (this.consignments.length % this.filteringSliceValue > 0) {
    //        this.maxSliceValue = this.consignments.length + (this.filteringSliceValue - (this.consignments.length % this.filteringSliceValue)); //Om antalet invitations inte är delbart på this.filteringSliceValue, ska den ändå visa rätt invites på sista sidan
    //        this.minSliceValue = this.maxSliceValue - this.filteringSliceValue;
    //    }
    //    else {
    //        this.maxSliceValue = this.consignments.length;
    //        this.minSliceValue = this.maxSliceValue - this.filteringSliceValue;
    //    }
    //}

    //resetSliceValue() {
    //    this.maxSliceValue = this.filteringSliceValue;
    //    this.minSliceValue = 0;

    //    this.showAllConsignmentsEnabled = false;
    //}
}