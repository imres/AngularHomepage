import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, Injector } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { DialogService } from "ng2-bootstrap-modal";

import { BasicComponent } from '../../shared/basic.component';
import { Person, Invitation, Consignment, ActiveConsignment, Pager} from '../../_models/index';
import { UserService, InvitationService, ConsignmentService, ToastrService, PagerService } from '../../_services/index';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { SendInvitationDialogComponent } from 'src/app/shared/dialogs/send-invitation-dialog/send-invitation-dialog.component';
// import { SendInvitationDialogComponent } from '../../_dialog/send-invitation-dialog.component';
// import { InvitationResponseDialogComponent } from '../../_dialog/invitation-response-dialog.component';


@Component({
    // moduleId: module.id,
    selector: 'consignment',
    templateUrl: 'consignment.component.html'
    //changeDetection: ChangeDetectionStrategy.OnPush
})


export class ConsignmentComponent extends BasicComponent implements OnInit {
    modalRef: MDBModalRef
    activeConsignments: ActiveConsignment[];
    consignments: ActiveConsignment[];

    currentUser: Person;
    confirmResult: boolean = null;
    loading = false;

    constructor(
        injector: Injector,
        private cd: ChangeDetectorRef,
        // private dialogService: DialogService,
        private toastrService: ToastrService,
        private router: Router,
        private modalService: MDBModalService
    ) {
        super(injector);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
    }

    ngOnInit() {
        this.getConsignments();

        this.consignmentService.consignmentList.subscribe(consignments => {
            if (!consignments || !this.consignments){
                return;
            }

            this.consignments = this.consignments.concat(consignments);
            this.orderBy('-StartDate', this.consignments);
        }); 
    }

    getConsignments() {
        this.loading = true;
        this.consignmentService.getConsignments(this.currentUser.PersonId).subscribe(res => {
            this.consignments = res;
            this.loading = false;
            console.log("consignments:", res);
            this.orderBy('-StartDate', this.consignments);
        });
    }
    
    showInvite(invite: Invitation) {
        console.log(invite);
    }

    showConfirm(event: any) {
        this.modalRef = this.modalService.show(SendInvitationDialogComponent);
        this.modalRef.content.action.subscribe( (result: any) => { console.log('dialog result: ', result); });
    }

    // showConfirm(event: any) {
    //     this.dialogService.addDialog(SendInvitationDialogComponent, {
    //         title: 'Skicka inbjudan',
    //         message: 'Bla bla confirm some action?'
    //     })
    //         .subscribe((isConfirmed) => {
    //             //Get dialog result
    //             this.confirmResult = isConfirmed;

    //             this.toastrService.ShowToastr(isConfirmed, false, true, "Inbjudan skickades");

    //         });
    // }

    routeToConsignmentDetail(item: ActiveConsignment) {
        this.router.navigate(['/consignment-detail', item.PackageId])
    }
}