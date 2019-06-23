import { Injectable, EventEmitter, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Person, Invitation, InvitationExtended } from '../_models/index';
// import 'rxjs/add/operator/map';
import { ToastrService } from './toastr.service';
// import { ToastsManager } from 'ng2-toastr';
import { HttpStatusCode } from '../_models/enums';
    
export class BaseService {
    protected toastrService: ToastrService;
    protected http: HttpClient;

    constructor(injector: Injector) {
        this.toastrService = injector.get(ToastrService);
        this.http = injector.get(HttpClient);
     }

     protected apiRoute = 'http://192.168.0.172:65192/api/';
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    // ToastrCreateSuccess(message = "Förfrågan lyckades", title="Skapades"){
    //     // this.toastrService.ShowToastr(isConfirmed, false, "Inbjudan skickades");
    //     this.toastrService.Success(message, title);
    // }

    // ToastrCreateError(message = "Kunde ej skapa", title="Skapades ej"){
    //     this.toastrService.Error(message, title);
    // }

}