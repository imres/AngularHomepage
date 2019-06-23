import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// import 'rxjs/add/operator/map';

import { Person, Invitation } from '../_models/index';

@Injectable()
export class ToastrService {

    private toastrOptions = {
        showCloseButton: true
    };

    constructor(
    //    public toastr: ToastsManager
        ) {
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
    // public ShowToastr(isConfirmed: boolean, errorMessageEnabled: boolean = true, closeButtonEnabled: boolean = false,
    //     successMessage: string = "Lyckades", errorMessage: string = "Kunde inte genomföra frågan") {

    //     if (isConfirmed) {
    //         this.toastr.success(successMessage, "", {
    //             showCloseButton: closeButtonEnabled
    //         });
    //     } else if (!isConfirmed && errorMessageEnabled){
    //         this.toastr.error(errorMessage);
    //     }
    // }

    // Success(message: string, title: string){
    //     // this.toastrService.ShowToastr(isConfirmed, false, "Inbjudan skickades");
    //     this.toastr.success(message, title, this.toastrOptions);
    // }

    // Error(message: string, title: string){
    //     this.toastr.error(message, title, this.toastrOptions);
    // }

    
}