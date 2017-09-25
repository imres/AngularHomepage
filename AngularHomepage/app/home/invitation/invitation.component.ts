import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { DialogService } from "ng2-bootstrap-modal";

import { Person, Invitation } from '../../_models/index';
import { UserService, InvitationService } from '../../_services/index';
import { ConfirmComponent } from '../../_dialog/confirm.component';



@Component({
    moduleId: module.id,
    selector: 'invite',
    templateUrl: 'invitation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})


export class InvitationComponent implements OnInit {
    @Input() public invitationStream: Invitation[];
    //invitation: Invitation = new Invitation();
    confirmResult: boolean = null;

    constructor(private cd: ChangeDetectorRef, private dialogService: DialogService) {
    }

    ngOnInit() {
    }

    //public sendInvite(invitation: Invitation) {
    //    this.invitationService.sendInvite(invitation).subscribe(res => {
    //        console.log(res);
    //    });
    //}

    showConfirm() {
        console.log("Show");
        this.dialogService.addDialog(ConfirmComponent, {
            title: 'Skicka inbjudan',
            message: 'Bla bla confirm some action?'
        })
            .subscribe((isConfirmed) => {
                //Get dialog result
                this.confirmResult = isConfirmed;
            });
    }
}