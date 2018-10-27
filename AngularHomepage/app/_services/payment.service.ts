import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Person, Invitation } from '../_models/index';
import 'rxjs/add/operator/map';

@Injectable()
export class PaymentService {
    constructor(private http: Http) { }

    headers = new Headers({
        'Content-Type': 'application/json'
    });
    

    processPayment(invitation: Invitation) {
        return this.http.post('http://localhost:65192/api/Payment/Payment',
            JSON.stringify(invitation),
            { headers: this.headers })
            .map((response: Response) =>
                response.json()
            ).catch(error =>
                Observable.throw(false)
            );
    }
}