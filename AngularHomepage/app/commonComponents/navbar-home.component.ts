import { Component, Input, Output, EventEmitter, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges, Injector } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { DialogService } from "ng2-bootstrap-modal";
import { Router, ActivatedRoute } from '@angular/router';

import { BasicComponent } from '../shared/basic.component';
import { Person, Invitation, ActiveConsignment } from '../_models/index';
import { UserService, InvitationService, ToastrService, ConsignmentService, PagerService } from '../_services/index';
import { ConfirmComponent } from '../_dialog/confirm.component';
import { InviteResponseComponent } from '../_dialog/invite-response.component';
import { InvitationStatusEnum } from '../_models/enums/index';
import { FilterPipe } from '../filter.pipe';


@Component({
    moduleId: module.id,
    templateUrl: 'navbar-home.component.html',
    selector: 'navbar-home'
})

export class NavbarHomeComponent extends BasicComponent implements OnInit {
    @Input() invitations: Invitation[];
    @Input() invitationNotifications: Invitation[];
    finishedConsignments: ActiveConsignment[];
    archivedConsignments: ActiveConsignment[];  
    //@Output() invitationsChanged: EventEmitter<any> = new EventEmitter<any>(); //Push change once emit is called on this object

    //invitations: Invitation[];
    //invitationNotifications: Invitation[];
    currentUser: Person;
    showDialog = false;
    isClassActive: boolean;
    invitationStatus = InvitationStatusEnum;
    notifications = 0; 
    selectedUserPersonId: string;
    searchText: string;

    constructor(
        injector: Injector,
        private userService: UserService,
        private invitationService: InvitationService,
        private cd: ChangeDetectorRef,
        private dialogService: DialogService,
        private consignmentService: ConsignmentService,
        private toastrService: ToastrService,
        private pagerService: PagerService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        )
    {
        super(injector);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.isClassActive = false;
    }

    ngOnInit() {
        this.getInvitations();
        this.getFinishedConsignments();
        this.getAllConsignments();
        this.getUsers();

        this.invitationService.invitationList.subscribe(invitations => {
            this.invitations = invitations;

            this.updateFilteredInvitations();
        });
    }

    updateFilteredInvitations() {
        if (!this.invitations || !this.currentUser || !this.currentUser.PersonId) return;

        this.invitationNotifications = this.invitations.filter(x => { 
            return x.Status == InvitationStatusEnum.Created && x.InvitationInitiatorPersonId != this.currentUser.PersonId 
        });

        this.notificationCounter();
    }

    notificationCounter(){
        if (!this.invitationNotifications && this.pagedItems)
            this.notifications = this.pagedItems.length;

        if (!this.pagedItems && this.invitationNotifications)
            this.notifications = this.invitationNotifications.length;

        if (this.pagedItems && this.invitationNotifications)
            this.notifications = this.invitationNotifications.length + this.pagedItems.length;
    }

    getInvitations() {  
        this.invitationService.getInvitations(this.currentUser.PersonId).subscribe(invitations => {
            console.log("Hämtade invites från API");

            if (invitations == null) return;

            this.invitations = invitations;

            //this.updateFilteredInvitations();

            this.invitationService.updateInvitations(invitations);

        }, err => { console.log("Error: {0}", err) });
    }

    getFinishedConsignments() {
        this.consignmentService.getArchivedConsignments(this.currentUser.PersonId).subscribe((res: any) => {
            this.archivedConsignments = res;
            this.finishedConsignments = this.archivedConsignments.filter(x => { return x.Status == 10 }); /*Sätt en filtrering som bara visar dom som inte blivit sedda*/

            this.orderBy('-EndDate', this.finishedConsignments);
            this.notificationCounter();
        });
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

    routeToConsignmentDetail(item: ActiveConsignment) {
        this.router.navigate(['/consignment-detail', item.PackageId]);
        this.searchText = '';
    }

    routeToUserProfile(item: Person) {
        if (this.currentUser.PersonId != item.PersonId)
            this.router.navigate(['/user', item.PersonId])

        if (this.currentUser.PersonId == item.PersonId)
            this.router.navigate(['/profile'])

        this.searchText = '';
    }

    logOut() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
    }
}