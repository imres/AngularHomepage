import { Injectable, EventEmitter, Injector } from '@angular/core';
import { Http, Headers, Response, ResponseType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Person, Invitation, InvitationExtended } from '../_models/index';
import 'rxjs/add/operator/map';
import { BaseService } from './base.service';
import { HttpStatusCode } from '../_models/enums/http-status-code.enum';

@Injectable()
export class InvitationService extends BaseService{
    private currentInviteSource = new BehaviorSubject<Invitation>(null);
    private invitationListSource = new BehaviorSubject<Invitation[]>(null);
    

    invitationList = this.invitationListSource.asObservable();
    currentInvite = this.currentInviteSource.asObservable();

    constructor(
        injector: Injector
    ) { 
        super(injector);
    }

    headers = new Headers({
        'Content-Type': 'application/json'
    });

    //Update active invitation used in dialog
    changeInviteData(invite: Invitation) {
        this.currentInviteSource.next(invite);
    }

    //Update invitation list with fresh data
    updateInvitations(invitations: Invitation[]) {
        this.invitationListSource.next(invitations);
    }

    sendInvite(invitation: Invitation) {
        return this.http.post(this.apiRoute + 'api/Invitation/Invite',
            JSON.stringify(invitation),
            { headers: this.headers })
            .map((response: Response) =>
                response.json()
            ).catch(error => 
                Observable.throw(false)
            );
    }

    acceptInvite(invitation: Invitation) {
        return this.http.post(this.apiRoute + 'Invitation/AcceptInvitation',
            JSON.stringify(invitation),
            { headers: this.headers })
            .map((response: Response) =>
                response.json()
            ).catch(error =>
                Observable.throw(false)
            );
    }

    savePackageId(invitation: InvitationExtended) {
        return this.http.post(this.apiRoute + 'Invitation/SavePackageId',
            JSON.stringify(invitation),
            { headers: this.headers })
            .map((response: Response) =>{
                this.ToastrCreateSuccess("Försändelse skapad");
                return response.json();
            }).catch((error: Response) => {
                if(error.status === HttpStatusCode.BAD_REQUEST){
                    this.ToastrCreateError(JSON.parse(error.text()));
                }
                
                return Observable.throw(false)
            });
    }

    endInvite(id: number) {
        return this.http.get(this.apiRoute + 'Invitation/EndInvitation/' + id)
            .map((response: Response) => 
                response.text()
            ).catch(error => 
                Observable.throw(false)
            );
    }

    getInvitations(personId: string) {
        return this.http.get(this.apiRoute + 'Invitation/GetInvitations/' + personId)
            .map((response: Response) =>
                response.json()
            ).catch(error => 
                Observable.throw(false)
            );
    }

    getUnrespondedInvitations(personId: string) {
        return this.http.get(this.apiRoute + 'Invitation/GetUnrespondedInvitations/' + personId)
            .map((response: Response) =>
                response.json()
            ).catch(error =>
                Observable.throw(false)
            );
    }
    /*getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt())
            .map((response: Response) =>
                response.json()
            );
    }*/

    //login(email: string, password: string) {
    //    return this.http.post('http://localhost:65192/api/User/Auth',
    //        JSON.stringify({ Email: email, Password: password }),
    //        { headers: this.headers })
    //        .map((response: Response) => {
    //            // login successful if there's a jwt token in the response
    //            let user = response.json();
    //            if (user && user.Token) {
    //                // store user details and jwt token in local storage to keep user logged in between page refreshes
    //                localStorage.setItem('currentUser', JSON.stringify(user));
    //            }
    //        });
    //}

}