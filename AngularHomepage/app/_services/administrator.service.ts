import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Person, Invitation, InvitationExtended } from '../_models/index';
import 'rxjs/add/operator/map';

@Injectable()
export class AdministratorService {
    constructor(private http: Http) { }

    headers = new Headers({
        'Content-Type': 'application/json'
    });
    
    cleanTable(id: string) {
        return this.http.get('http://localhost:65192/api/Administrator/CleanTable/' + id)
            .map((response: Response) =>
                response.text()
            ).catch(error =>
                Observable.throw(false)
            );
    }

}