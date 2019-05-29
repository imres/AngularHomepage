import { Injectable, EventEmitter, Injector } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Person, Invitation, InvitationExtended } from '../_models/index';
import 'rxjs/add/operator/map';
import { ToastrService } from './toastr.service';
import { ToastsManager } from 'ng2-toastr';
import { HttpStatusCode } from '../_models/enums';
    
export class BaseService {
    protected toastrService: ToastrService;

    constructor(injector: Injector) {
        this.toastrService = injector.get(ToastrService);
     }

    headers = new Headers({
        'Content-Type': 'application/json'
    });

    ToastrCreateSuccess(message = "Förfrågan lyckades", title="Skapades"){
        // this.toastrService.ShowToastr(isConfirmed, false, "Inbjudan skickades");
        this.toastrService.Success(message, title);
    }

    ToastrCreateError(message = "Kunde ej skapa", title="Skapades ej"){
        this.toastrService.Error(message, title);
    }

}