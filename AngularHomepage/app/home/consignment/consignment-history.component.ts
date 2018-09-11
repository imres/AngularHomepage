import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { DialogService } from "ng2-bootstrap-modal";

import { Person, Invitation, Consignment, ActiveConsignment, Pager } from '../../_models/index';
import { UserService, InvitationService, ConsignmentService, ToastrService, PagerService } from '../../_services/index';
import { ConfirmComponent } from '../../_dialog/confirm.component';
import { InviteResponseComponent } from '../../_dialog/invite-response.component';


@Component({
    moduleId: module.id,
    templateUrl: 'consignment-history.component.html',
    //changeDetection: ChangeDetectionStrategy.OnPush
})


export class ConsignmentHistoryComponent implements OnInit {
    archivedConsignments: ActiveConsignment[];
    finishedConsignments: ActiveConsignment[];
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
        this.getArchivedConsignments();

        this.getFinishedConsignments();

        this.consignmentService.consignmentList.subscribe(consignments => {
            if (!this.consignments) return;

            this.consignments = this.consignments.concat(consignments);
        });

    }

    getArchivedConsignments() {
        this.consignmentService.getArchivedConsignments(this.currentUser.PersonId).subscribe((res: any) => {
            this.archivedConsignments = res;

            // initialize pager to page 1
            this.setPage(1);
        });
    }

    getFinishedConsignments() {
        this.consignmentService.getFinishedConsignments(this.currentUser.PersonId).subscribe((res: any) => {
            this.finishedConsignments = res;

            console.log(res);
        });
    }

    setPage(Page: number) {
        if (Page < 1 || Page > this.pager.TotalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.archivedConsignments.length, Page);

        // get current page of items
        this.pagedItems = this.archivedConsignments.slice(this.pager.StartIndex, this.pager.EndIndex + 1);
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