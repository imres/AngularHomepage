import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {

    constructor(private vcr: ViewContainerRef, private toastr: ToastsManager) {

        this.toastr.setRootViewContainerRef(vcr);
    }

}