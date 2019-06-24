import { Component } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';


@Component({
  selector: 'send-invitation-dialog',
  templateUrl: './send-invitation-dialog.component.html',
})
export class SendInvitationDialogComponent {
    action: Subject<any> = new Subject();

  constructor(
    public modalRef: MDBModalRef) {

    }

    onYesClick() {
        this.action.next('Sparade!');
        this.modalRef.hide();
    }
  
    onNoClick() {
        // this.action.next('No');
        this.modalRef.hide();
    }

}