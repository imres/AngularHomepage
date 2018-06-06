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
    pager: Pager = new Pager();

    // paged items
    pagedItems: ActiveConsignment[];

    currentUser: Person;
    confirmResult: boolean = null;
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
}