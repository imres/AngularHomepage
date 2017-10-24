﻿import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Person, Invitation } from '../_models/index';
import 'rxjs/add/operator/map';

@Injectable()
export class ConsignmentService {

    constructor(private http: Http) { }

    headers = new Headers({
        'Content-Type': 'application/json'
    });

    acceptInvite(invitation: Invitation) {
        return this.http.post('http://localhost:65192/api/Consignment/AddConsignment',
            JSON.stringify(invitation),
            { headers: this.headers })
            .map((response: Response) =>
                response.json()
            );
    }

    getInvitations(personId: string) {
        return this.http.get('http://localhost:65192/api/Invitation/GetInvitations/' + personId)
            .map((response: Response) =>
                response.json()
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