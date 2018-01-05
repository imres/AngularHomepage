import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'rxjs/add/operator/map';

import { Person, Invitation } from '../_models/index';

@Injectable()
export class ToastrService {

    constructor(public toastr: ToastsManager) {
    }

    /**
        Show notification message on website
     * @method ShowToastr
        Indicates success or error status
     * @param isConfirmed
        Should error message be available?
     * @param errorMessageEnabled
        Message to display on success
     * @param successMessage
        Message to display on error (if enabled)
     * @param errorMessage
     *///ShowToastr documentation
    public ShowToastr(isConfirmed: boolean, errorMessageEnabled: boolean = true, closeButtonEnabled: boolean = false,
        successMessage: string = "Lyckades", errorMessage: string = "Kunde inte genomföra frågan") {

        if (isConfirmed) {
            this.toastr.success(successMessage, "", {
                showCloseButton: closeButtonEnabled
            });
        } else if (!isConfirmed && errorMessageEnabled){
            this.toastr.error(errorMessage);
        }
    }
}