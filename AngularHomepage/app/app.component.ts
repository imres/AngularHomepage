import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {

    constructor(private vcr: ViewContainerRef, private toastrManager: ToastsManager, private toastOptions: ToastOptions) {

        this.toastrManager.setRootViewContainerRef(vcr);
        this.toastOptions.positionClass = "toast-bottom-right";
    }

}