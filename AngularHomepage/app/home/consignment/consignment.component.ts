import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { DialogService } from "ng2-bootstrap-modal";

import { BasicComponent } from '../../shared/basic.component';
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


export class ConsignmentComponent extends BasicComponent implements OnInit {
    activeConsignments: ActiveConsignment[];
    consignments: ActiveConsignment[];

    currentUser: Person;
    confirmResult: boolean = null;
    showConsignments = true;
    loading = false;

    constructor(private cd: ChangeDetectorRef,
        private dialogService: DialogService,
        private consignmentService: ConsignmentService,
        private toastrService: ToastrService,
        private pagerService: PagerService,
    ) {
        super(pagerService);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
    }

    ngOnInit() {
        this.getConsignments();

        this.consignmentService.consignmentList.subscribe(consignments => {
            if (!this.consignments) return;

            this.consignments = this.consignments.concat(consignments);

            this.orderBy('-StartDate', this.consignments);
        }); 
    }

    getConsignments() {
        this.loading = true;
        this.consignmentService.getConsignments(this.currentUser.PersonId).subscribe(res => {
            this.consignments = res;

            this.loading = false;

            console.log(res);

            this.orderBy('-StartDate', this.consignments);
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