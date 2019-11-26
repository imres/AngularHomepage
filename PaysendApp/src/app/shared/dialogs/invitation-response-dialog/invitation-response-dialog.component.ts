import { Component, Injector } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { BaseDialogComponent } from '../base-dialog.component';
import { Invitation, InvitationRole, PaymentMethod, Person } from 'src/app/_models';
import { InvitationService } from 'src/app/_services';


@Component({
  selector: 'invitation-response-dialog',
  templateUrl: './invitation-response-dialog.component.html',
})
export class InvitationResponseDialogComponent extends BaseDialogComponent {
    title: string;
    message: string;
    model: Invitation = new Invitation();
    content: any;
    currentInvitation: Invitation;

    currentUser: Person;
    isReceiver: boolean = null;
    dialogStep = 1;
    showCustomAddress = false;


  constructor(injector: Injector,
    private invitationService: InvitationService,
    private modalService: MDBModalService,
    ) {
      super(injector);
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

    ngOnInit() {
        this.currentInvitation = this.content.currentInvitation;
        this.currentInvitation.ReceiverPhoneNumber = this.currentUser.PhoneMobile;
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

    HasReceiverRole(invite: Invitation): boolean {
        if (invite.ReceiverPersonId == this.currentUser.PersonId) {
            return true;
        } else {
            return false;
        }
    }

    resetModel() {
        this.model = new Invitation();
        this.dialogStep = 1;
    }

    customAddressRadio(event: any) {
        if (event == 'option2') {
            return this.showCustomAddress = true;
        }
            
        if (event == 'option1') {
            return this.showCustomAddress = false;
        }
    }

    acceptInvitation(invite: Invitation) {
        // on click on confirm button we set dialog result as true,
        // then we can get dialog result from caller code
        if (!invite.DeliveryAddress) {
            invite.DeliveryAddress = this.currentUser.Address;
            invite.DeliveryPostalCode = this.currentUser.PostalCode;
            invite.DeliveryCity = this.currentUser.City;
        }

        this.invitationService.acceptInvite(invite).subscribe(res => {
            this.onYesClick();
        });

        this.modalRef.content.result = true;
        this.onNoClick();
    }

  onYesClick() {
      this.action.next('Inbjudan accepterad!');
      this.modalRef.hide();
  }

  onNoClick() {
      // this.action.next('No');
      this.modalRef.hide();
  }

}