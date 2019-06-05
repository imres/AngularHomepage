import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Injector } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { DialogService } from "ng2-bootstrap-modal";
import { Router } from '@angular/router';

import { BasicComponent } from '../../shared/basic.component';
import { Person, Invitation, ActiveConsignment } from '../../_models/index';
import { UserService, InvitationService, ToastrService, ConsignmentService, PagerService } from '../../_services/index';
import { SendInvitationDialogComponent } from '../../_dialog/send-invitation-dialog.component';
import { InvitationStatusEnum } from '../../_models/enums/index';
import { FilterPipe } from '../../filter.pipe';


@Component({
    moduleId: module.id,
    templateUrl: 'sidebar.component.html',
    selector: 'sidebar',
})

export class SidebarComponent extends BasicComponent implements OnInit {

    currentUser: Person;
    sidebarActive = true;

    constructor(
        injector: Injector,
        private userService: UserService,
        private dialogService: DialogService,
        private invitationService: InvitationService,
        private consignmentService: ConsignmentService,
        private toastrService: ToastrService,
        private pagerService: PagerService,
        private router: Router) {
        super(injector);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.getAllConsignments();
        this.getUsers();

    }

    showConfirm(event: any) {
        this.dialogService.addDialog(SendInvitationDialogComponent, {
            title: 'Skicka inbjudan',
            message: 'Bla bla confirm some action?'
        })
            .subscribe((isConfirmed) => {
                //Get dialog result
                this.confirmResult = isConfirmed;

                this.toastrService.ShowToastr(isConfirmed, false, "Inbjudan skickades");

            });
    }

    routeToConsignmentDetail(item: ActiveConsignment) {
        this.router.navigate(['/consignment-detail', item.PackageId])
    }

    routeToUserProfile(item: Person) {
        if (this.currentUser.PersonId != item.PersonId)
            this.router.navigate(['/user', item.PersonId])

        if (this.currentUser.PersonId == item.PersonId)
            this.router.navigate(['/profile'])
    }
}