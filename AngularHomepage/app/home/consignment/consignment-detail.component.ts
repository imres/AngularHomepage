import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { DialogService } from "ng2-bootstrap-modal";

import { BasicComponent } from '../../shared/basic.component';
import { Person, Invitation, Consignment, ActiveConsignment, Pager } from '../../_models/index';
import { PostNordEvent } from '../../_models/PostNord/index';
import { UserService, InvitationService, ConsignmentService, ToastrService, PagerService } from '../../_services/index';
import { ConfirmComponent } from '../../_dialog/confirm.component';
import { InviteResponseComponent } from '../../_dialog/invite-response.component';


@Component({
    moduleId: module.id,
    templateUrl: 'consignment-detail.component.html'
    //changeDetection: ChangeDetectionStrategy.OnPush
})


export class ConsignmentDetailComponent extends BasicComponent implements OnInit {
    selectedConsignmentPackageId: string;
    consignments: ActiveConsignment[];
    selectedConsignment: ActiveConsignment[];
    events: PostNordEvent[];

    currentUser: Person;
    confirmResult: boolean = null;
    loading = false;

    constructor(private cd: ChangeDetectorRef,
        private dialogService: DialogService,
        private consignmentService: ConsignmentService,
        private toastrService: ToastrService,
        private pagerService: PagerService,
        private activatedRoute: ActivatedRoute,
    ) {
        super(pagerService);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    }

    ngOnInit() {
        this.getAllConsignments();
        
    }

    getAllConsignments() {
        this.consignmentService.getAllConsignments().subscribe(res => {
            this.allConsignments = res;

            this.getSelectedConsignment();
        });
    }

    getSelectedConsignment() {
        this.selectedConsignmentPackageId = this.activatedRoute.snapshot.params['PackageId'];

        this.selectedConsignment = this.allConsignments.filter(x => { return x.PackageId == this.selectedConsignmentPackageId });
        console.log(this.selectedConsignment);

        if (this.selectedConsignment) {
            var eventList = this.selectedConsignment.map(x => x.Events);
            this.events = eventList[0];
            if(this.events)
                this.events.sort((a, b) => a['eventTime'] > b['eventTime'] ? 1 : a['eventTime'] === b['eventTime'] ? 0 : -1).reverse();
        }

        this.loading = false;
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