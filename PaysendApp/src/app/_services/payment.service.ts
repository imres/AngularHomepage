import { Injectable, EventEmitter, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Person, Invitation } from '../_models/index';
// import 'rxjs/add/operator/map';
import { BaseService } from './base.service';

@Injectable()
export class PaymentService extends BaseService {
    constructor(injector: Injector) {
        super(injector);
    }

    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    

    processPayment(invitation: Invitation, stripeEmail: string, stripeToken: string) {
        var params = {stripeEmail: stripeEmail, stripeToken: stripeToken};

        return this.http.post(this.apiRoute + 'Payment/Payment',
            JSON.stringify(invitation),
            { headers: this.headers, params: params })
            .pipe(map((response: Response) =>
                response.json()
            ),catchError(error =>
                Observable.throw(false)
            ));
    }
}