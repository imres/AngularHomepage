import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Person, Invitation, InvitationExtended } from '../_models/index';
import { InvitationStatusEnum } from '../_models/enums/index';
// import 'rxjs/add/operator/map';

@Injectable()
export class FilterService {

    constructor(private http: HttpClient) { }

    //Set new invitation status from object in list
    updateInvitationStatus(invitationList: any[], invitation: any, newStatus: InvitationStatusEnum): void {
        let updateInvitation = invitationList.filter(x => x.Id == invitation.Id);

        let index = invitationList.indexOf(updateInvitation[0]);

        invitation.Status = newStatus;

        invitationList[index] = invitation;
    }

    removeFromListByProperty(list: any[], object: any, property = "Id"): any[] {
        list = list.filter(x => {
            return x[property] != object[property];
        });

        return list;
    }
    
}