import { Injectable, EventEmitter, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Person, Invitation, InvitationExtended } from '../_models/index';
// import 'rxjs/add/operator/map';
import { BaseService } from './base.service';

@Injectable()
export class AdministratorService extends BaseService {
    constructor(injector: Injector) {
        super(injector);
    }

    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    
    cleanTable(id: string) {
        return this.http.get(this.apiRoute + 'Administrator/CleanTable/' + id)
            .pipe(map((response: Response) =>
                response.text()
            ),catchError(error =>
                Observable.throw(false)
            ));
    }

}