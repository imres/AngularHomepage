import {
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
    selector: 'unresponded-invites',
    templateUrl: 'unresponded-invites.component.html'
})

export class UnrespondedInvitesComponent implements OnInit {
    @Input() unrespondedInvitations: Invitation[];
    
    currentUser: Person;
    //unrespondedInvitations: Invitation[];
    maxSliceValue = 4;
    minSliceValue = 0;
    showAllInvitationsEnabled = false;
    invitationStatus: InvitationStatusEnum = new InvitationStatusEnum;
    showInvitations = true;

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

    incrementSliceValue() {
        if (this.maxSliceValue >= this.unrespondedInvitations.length)
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

    //multiplySliceValue() {
    //    this.maxSliceValue = this.paginationNumber * 10;
    //}

    showAllInvitations() {
        this.maxSliceValue = this.unrespondedInvitations.length;
        this.minSliceValue = 0;

        this.showAllInvitationsEnabled = true;
    }

    maximizeSliceValue() {
        if (this.unrespondedInvitations.length % 4 > 0){
            this.maxSliceValue = this.unrespondedInvitations.length + (4 - (this.unrespondedInvitations.length % 4)); //Om antalet invitations inte är delbart på 4, ska den ändå visa rätt invites på sista sidan
            this.minSliceValue = this.maxSliceValue - 4;
        }
        else {
            this.maxSliceValue = this.unrespondedInvitations.length;
            this.minSliceValue = this.maxSliceValue - 4;
        }
    }

    resetSliceValue() {
        this.maxSliceValue = 4;
        this.minSliceValue = 0;

        this.showAllInvitationsEnabled = false;
    }

    hideInvites() {
        this.showInvitations = false;
    }

    showInvites() {
        this.showInvitations = true;
    }
    //multiplySliceValue(pageNumber) {
    //    this.maxSliceValue = pageNumber * 4;
    //}
}