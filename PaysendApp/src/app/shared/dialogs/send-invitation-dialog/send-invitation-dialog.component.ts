import { Component, Injector } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { BaseDialogComponent } from '../base-dialog.component';


@Component({
  selector: 'send-invitation-dialog',
  templateUrl: './send-invitation-dialog.component.html',
})
export class SendInvitationDialogComponent extends BaseDialogComponent {

  constructor(injector: Injector) {
      super(injector);
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