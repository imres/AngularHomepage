import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpStatusCode } from '../_models/enums/index';
import { BaseService } from './base.service';

@Injectable()
export class AuthenticationService extends BaseService {
    constructor(injector: Injector) {
        super(injector);
    }

    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    bankIdAuth(personId: string) {
        return this.http.get(this.apiRoute + 'BankId/BankIdAuth/' + personId)
            .pipe(map((response: Response) =>
                response.json()
            ),catchError(err => {
                return Observable.throw("Could not authenticate");
            }));
    }

    bankIdCollect(bankIdAuthResponse: JSON) {
        return this.http.post(this.apiRoute + 'BankId/BankIdCollect',
            bankIdAuthResponse,
            { headers: this.headers })
            .pipe(map((response: Response) => {
                let user = response.json();
                if (user) {//&& user.Token
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            }),catchError(err => {

                if (err.status == HttpStatusCode.PRECONDITION_FAILED)
                    return Observable.throw("BankID anrop misslyckades");
                if (err.status == HttpStatusCode.BAD_REQUEST)
                    return Observable.throw("Det gick inte att logga in. Påloggningen är redan påbörjad. Öppna BankID säkerhetsapp och vänta tills du ser 'Klar att användas'. Vänligen försök sedan logga in igen.");

                return Observable.throw("Could not send request");
            }));
    }

    login(email: string, password: string) {
        return this.http.post(this.apiRoute + 'User/Auth',
            JSON.stringify({ Email: email, Password: password }),
            { headers: this.headers })
            .pipe(map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                console.log('Inloggad - Test 2');
                if (user) { //&& user.Token
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    console.log('Inloggad - Test 3');
                }
            }),catchError(err => {

                if (err.status == HttpStatusCode.FORBIDDEN)
                    return Observable.throw("Invalid login credentials");

                return Observable.throw("Could not send request");
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}