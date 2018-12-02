import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, Injector} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { DialogService } from "ng2-bootstrap-modal";

import { BasicComponent } from '../../shared/basic.component';
import { Person, Invitation, Consignment, ActiveConsignment, Pager } from '../../_models/index';
import { UserService, InvitationService, ConsignmentService, ToastrService, PagerService } from '../../_services/index';
import { ConfirmComponent } from '../../_dialog/confirm.component';
import { InviteResponseComponent } from '../../_dialog/invite-response.component';


@Component({
    moduleId: module.id,
    templateUrl: 'consignment-history.component.html',
    //changeDetection: ChangeDetectionStrategy.OnPush
})


export class ConsignmentHistoryComponent extends BasicComponent implements OnInit {
    archivedConsignments: ActiveConsignment[];
    finishedConsignments: ActiveConsignment[];
    // pager object
    pager: Pager = new Pager();

    // paged items
    pagedItems: ActiveConsignment[];

    currentUser: Person;
    confirmResult: boolean = null;
    showAllConsignmentsEnabled = false;
    showConsignments = true;
    loading = false;

    constructor(
        injector: Injector,
        private cd: ChangeDetectorRef,
        private dialogService: DialogService,
        private consignmentService: ConsignmentService,
        private toastrService: ToastrService,
        private pagerService: PagerService,

    ) {
        super(injector);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    }

    ngOnInit() {
        this.getArchivedConsignments();

        this.getFinishedConsignments();

    }

    getArchivedConsignments() {
        this.consignmentService.getArchivedConsignments(this.currentUser.PersonId).subscribe((res: any) => {
            this.archivedConsignments = res;

            // initialize pager to page 1
            this.orderBy('-StartDate', this.archivedConsignments);
        });
    }

    getFinishedConsignments() {
        this.consignmentService.getFinishedConsignments(this.currentUser.PersonId).subscribe((res: any) => {
            this.finishedConsignments = res;

            console.log(res);
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

                this.toastrService.ShowToastr(isConfirmed, false, true, "Inbjudan skickades");

            });
    }
}