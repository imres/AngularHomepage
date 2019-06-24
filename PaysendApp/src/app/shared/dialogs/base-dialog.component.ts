import { Component, Injector } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

export abstract class BaseDialogComponent {
    protected modalRef: MDBModalRef;
    action: Subject<any> = new Subject();

  constructor(injector: Injector) {
      this.modalRef = injector.get(MDBModalRef);
    }

    abstract onYesClick();
  
    abstract onNoClick();

}