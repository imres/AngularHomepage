import { Component, Injector } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { BaseDialogComponent } from '../base-dialog.component';
import { Invitation, InvitationRole, PaymentMethod, Person } from 'src/app/_models';
import { InvitationService } from 'src/app/_services';


@Component({
  selector: 'send-invitation-dialog',
  templateUrl: './send-invitation-dialog.component.html',
})
export class SendInvitationDialogComponent extends BaseDialogComponent {
  title:string;
  message:string;
  model: Invitation = new Invitation();
  invitationRoles = new InvitationRole();
  selectedRole = 0;
  payment = new PaymentMethod();
  selectedPaymentMethod = 0;
  currentUser: Person;
  samePersonId = false;
  showCustomAddress = false;


  constructor(injector: Injector,
    private invitationService: InvitationService) {
      super(injector);
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  public sendInvite() {
    this.setPersonId();

    if (this.model.SenderPersonId != this.model.ReceiverPersonId) {
        this.samePersonId = false;

        if (!this.model.DeliveryAddress) {
            this.model.DeliveryAddress = this.currentUser.Address;
            this.model.DeliveryPostalCode = this.currentUser.PostalCode;
            this.model.DeliveryCity = this.currentUser.City;
        }

        this.invitationService.sendInvite(this.model).subscribe(res => {
            this.onYesClick();
        });
    }
    else { 
        this.modalRef.content = false;
        this.samePersonId = true;
    }
}


private setPersonId() {
    //If one role have person id set, use currentuser to fill other
    if (this.model.ReceiverPersonId != null && this.model.ReceiverPersonId.length > 0) {
        this.model.SenderPersonId = this.currentUser.PersonId;
    } else {
        this.model.ReceiverPersonId = this.currentUser.PersonId;
    }

    this.model.InvitationInitiatorPersonId = this.currentUser.PersonId;
}

customAddressRadio(event: any) {
    if (event == 'option2') {
        return this.showCustomAddress = true;
    }

    if (event == 'option1') {
        return this.showCustomAddress = false;
    }
}

resetModel() {
    this.model = new Invitation();
    // this.dialogStep = 1;
}

  onYesClick() {
      this.action.next('Inbjudan skickad!');
      this.modalRef.hide();
  }

  onNoClick() {
      // this.action.next('No');
      this.modalRef.hide();
  }

}