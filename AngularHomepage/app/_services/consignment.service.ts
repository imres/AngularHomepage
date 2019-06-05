import { Injectable, Injector } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Person, Invitation, Consignment, ActiveConsignment } from '../_models/index';
import 'rxjs/add/operator/map';
import { BaseService } from './base.service';

@Injectable()
export class ConsignmentService extends BaseService {
    private consignmentListSource = new BehaviorSubject<ActiveConsignment>(null);

    consignmentList = this.consignmentListSource.asObservable();

    constructor(injector: Injector) {
        super(injector);
    }

    headers = new Headers({
        'Content-Type': 'application/json'
    });

    updateConsignments(consignments: ActiveConsignment) {
        this.consignmentListSource.next(consignments);
    }

    acceptInvite(invitation: Invitation) {
        return this.http.post(this.apiRoute + 'Consignment/AddConsignment',
            JSON.stringify(invitation),
            { headers: this.headers })
            .map((response: Response) =>
                response.json()
            );
    }

    getConsignments(personId: string) {
        return this.http.get(this.apiRoute + 'Consignment/GetConsignments/' + personId)
            .map((response: Response) =>
                response.json()
            );
    }

    getAllConsignments() {
        return this.http.get(this.apiRoute + 'Consignment/GetAllConsignments/')
            .map((response: Response) =>
                response.json()
            );
    }

    getArchivedConsignments(personId: string) {
        return this.http.get(this.apiRoute + 'Consignment/GetArchivedConsignments/' + personId)
            .map((response: Response) =>
                response.json()
            );
    }

    getFinishedConsignments(personId: string) {
        return this.http.get(this.apiRoute + 'Consignment/GetFinishedConsignments/' + personId)
            .map((response: Response) =>
                response.json()
            );
    }

    archiveConsignment(packageId: string) {
        console.log("archive service call: ", packageId);
        return this.http.get(this.apiRoute + 'Consignment/ArchiveConsignment/' + packageId)
            .map((response: Response) => {
                response.json();
            });
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