﻿import {
    Component, OnInit, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA,
    ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, ViewContainerRef
} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { DialogService } from "ng2-bootstrap-modal";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Person, Invitation } from '../../_models/index';
import { UserService, InvitationService, AlertService, ToastrService } from '../../_services/index';
import { ConfirmComponent } from '../../_dialog/confirm.component';
import { InviteResponseComponent } from '../../_dialog/invite-response.component';
import { InvitationStatusEnum } from '../../_models/enums/index';



@Component({
    moduleId: module.id,
    selector: 'active-invitation',
    templateUrl: 'active-invitation.component.html'
})

export class ActiveInvitationComponent implements OnInit {
    @Input() activeInvitations: Invitation[];
    
    currentUser: Person;
    //unrespondedInvitations: Invitation[];
    maxSliceValue = 4;
    minSliceValue = 0;
    invitationStatus: InvitationStatusEnum = new InvitationStatusEnum;
    showInvitations = true;
    showAllInvitationsEnabled = false;
    showPackageIdForm = false;

    invitationWithPackageId = {
        Invitation: new Invitation,
        PackageId: ""
    };

    constructor(private cd: ChangeDetectorRef,
        private dialogService: DialogService,
        private invitationService: InvitationService,
        private toastr: ToastsManager,
        private toastrService: ToastrService,
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
    }

    setPackageId(invitation: Invitation, packageId: string) {

    }

    
    incrementSliceValue() {
        if (this.maxSliceValue >= this.activeInvitations.length)
            return;

        this.maxSliceValue += 4;
        this.minSliceValue += 4;
    }

    incrementSliceValueTwice() {
        this.maxSliceValue += 8;
        this.minSliceValue += 8;
    }

    decrementSliceValue() {
        if (this.minSliceValue >= 4){
            this.maxSliceValue -= 4;
            this.minSliceValue -= 4;
        }
    }

    decrementSliceValueTwice() {
        this.maxSliceValue -= 8;
        this.minSliceValue -= 8;
    }
    

    showAllInvitations() {
        this.maxSliceValue = this.activeInvitations.length;
        this.minSliceValue = 0;

        this.showAllInvitationsEnabled = true;
    }

    maximizeSliceValue() {
        if (this.activeInvitations.length % 4 > 0){
            this.maxSliceValue = this.activeInvitations.length + (4 - (this.activeInvitations.length % 4)); //Om antalet invitations inte är delbart på 4, ska den ändå visa rätt invites på sista sidan
            this.minSliceValue = this.maxSliceValue - 4;
        }
        else {
            this.maxSliceValue = this.activeInvitations.length;
            this.minSliceValue = this.maxSliceValue - 4;
        }
    }

    resetSliceValue() {
        this.maxSliceValue = 4;
        this.minSliceValue = 0;

        this.showAllInvitationsEnabled = false;
    }
}