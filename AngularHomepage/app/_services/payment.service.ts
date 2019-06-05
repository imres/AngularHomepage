import { Injectable, EventEmitter, Injector } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Person, Invitation } from '../_models/index';
import 'rxjs/add/operator/map';
import { BaseService } from './base.service';

@Injectable()
export class PaymentService extends BaseService {
    constructor(injector: Injector) {
        super(injector);
    }

    headers = new Headers({
        'Content-Type': 'application/json'
    });
    

    processPayment(invitation: Invitation, stripeEmail: string, stripeToken: string) {
        var params = {stripeEmail: stripeEmail, stripeToken: stripeToken};

        return this.http.post(this.apiRoute + 'Payment/Payment',
            JSON.stringify(invitation),
            { headers: this.headers, params: params })
            .map((response: Response) =>
                response.json()
            ).catch(error =>
                Observable.throw(false)
            );
    }
}