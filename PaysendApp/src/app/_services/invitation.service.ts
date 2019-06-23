import { Injectable, EventEmitter, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Person, Invitation, InvitationExtended, ActiveConsignment } from '../_models/index';
// import 'rxjs/add/operator/map';
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

    headers = new HttpHeaders({
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
        return this.http.post(this.apiRoute + 'Invitation/Invite',
            JSON.stringify(invitation),
            { headers: this.headers })
            .pipe(map((response: Response) =>
                response.json()
            ),catchError(error => 
                Observable.throw(false)
            ));
    }

    acceptInvite(invitation: Invitation) {
        return this.http.post(this.apiRoute + 'Invitation/AcceptInvitation',
            JSON.stringify(invitation),
            { headers: this.headers })
            .pipe(map((response: Response) =>
                response.json()
            ),catchError(error =>
                Observable.throw(false)
            ));
    }

    savePackageId(invitation: InvitationExtended) {
        return this.http.post<ActiveConsignment>(this.apiRoute + 'Invitation/SavePackageId', invitation);
            // JSON.stringify(invitation),
            // { headers: this.headers })
            // .pipe(map((response: Response) =>{
            //     // this.ToastrCreateSuccess("Försändelse skapad");
            //     return response.json();
            // }),catchError((error: Response) => {
            //     if(error.status === HttpStatusCode.BAD_REQUEST){
            //         // this.ToastrCreateError(JSON.parse(error.text()));
            //     }
                
            //     return Observable.throw(false)
            // }));
    }

    endInvite(id: number) {
        return this.http.get(this.apiRoute + 'Invitation/EndInvitation/' + id)
            .pipe(map((response: Response) => 
                response.text()
            ),catchError(error => 
                Observable.throw(false)
            ));
    }

    getInvitations(personId: string) {
        return this.http.get<Invitation[]>(this.apiRoute + 'Invitation/GetInvitations/' + personId)
            // .pipe(map((response: Response) =>
            //     response.json()
            // ),catchError(error => 
            //     Observable.throw(false)
            // ))
            ;
    }

    getUnrespondedInvitations(personId: string) {
        return this.http.get(this.apiRoute + 'Invitation/GetUnrespondedInvitations/' + personId)
            .pipe(map((response: Response) =>
                response.json()
            ),catchError(error =>
                Observable.throw(false)
            ));
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