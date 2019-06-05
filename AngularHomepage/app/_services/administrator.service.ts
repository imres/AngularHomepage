import { Injectable, EventEmitter, Injector } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Person, Invitation, InvitationExtended } from '../_models/index';
import 'rxjs/add/operator/map';
import { BaseService } from './base.service';

@Injectable()
export class AdministratorService extends BaseService {
    constructor(injector: Injector) {
        super(injector);
    }

    headers = new Headers({
        'Content-Type': 'application/json'
    });
    
    cleanTable(id: string) {
        return this.http.get(this.apiRoute + 'Administrator/CleanTable/' + id)
            .map((response: Response) =>
                response.text()
            ).catch(error =>
                Observable.throw(false)
            );
    }

}