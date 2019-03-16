import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, Injector } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { DialogService } from "ng2-bootstrap-modal";

import { BasicComponent } from '../../shared/basic.component';
import { Person, Consignment, ActiveConsignment } from '../../_models/index';
import { UserService, ConsignmentService, PagerService } from '../../_services/index';


@Component({
    moduleId: module.id,
    templateUrl: 'consignment-notification.component.html',
    selector: 'consignment-notification',
})


export class ConsignmentNotificationComponent extends BasicComponent implements OnInit {
    finishedConsignments: ActiveConsignment[];
    archivedConsignments: ActiveConsignment[];
    // paged items
    pagedItems: ActiveConsignment[];

    currentUser: Person;
    confirmResult: boolean = null;
    loading = false;

    constructor(
        injector: Injector,
        private consignmentService: ConsignmentService,
        private pagerService: PagerService,
        private router: Router,
    ) {
        super(injector)
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.getFinishedConsignments();
    }

    getFinishedConsignments() {
        this.consignmentService.getFinishedConsignments(this.currentUser.PersonId).subscribe((res: any) => {
            this.finishedConsignments = res;

            this.orderBy('-EndDate', this.finishedConsignments);
        });
    }

    routeToConsignmentDetail(item: ActiveConsignment) {
        this.router.navigate(['/consignment-detail', item.PackageId])
    }
}