import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HttpStatusCode } from '../_models/enums/index';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    headers = new Headers({
        'Content-Type': 'application/json'
    });

    bankIdAuth(personId: string) {
        return this.http.get('http://localhost:65192/api/BankId/BankIdAuth/' + personId)
            .map((response: Response) =>
                response.json()
            ).catch(err => {
                return Observable.throw("Could not authenticate");
            });
    }

    bankIdCollect(bankIdAuthResponse: JSON) {
        return this.http.post('http://localhost:65192/api/BankId/BankIdCollect',
            bankIdAuthResponse,
            { headers: this.headers })
            .map((response: Response) => {
                let user = response.json();
                if (user && user.Token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            }).catch(err => {

                if (err.status == HttpStatusCode.PRECONDITION_FAILED)
                    return Observable.throw("BankID anrop misslyckades");
                if (err.status == HttpStatusCode.BAD_REQUEST)
                    return Observable.throw("Det gick inte att logga in. Påloggningen är redan påbörjad. Öppna BankID säkerhetsapp och vänta tills du ser 'Klar att användas'. Vänligen försök sedan logga in igen.");

                return Observable.throw("Could not send request");
            });
    }

    login(email: string, password: string) {
        return this.http.post('http://localhost:65192/api/User/Auth',
            JSON.stringify({ Email: email, Password: password }),
            { headers: this.headers })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.Token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            }).catch(err => {

                if (err.status == HttpStatusCode.FORBIDDEN)
                    return Observable.throw("Invalid login credentials");

                return Observable.throw("Could not send request");
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}