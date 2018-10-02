import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { BasicComponent } from '../shared/basic.component';
import { Person, Invitation, ActiveConsignment } from '../_models/index';
import { UserService, PagerService, ConsignmentService } from '../_services/index';
import { Directive, HostListener } from "@angular/core";
import { FilterPipe } from '../filter.pipe';

@Component({
    moduleId: module.id,
    selector: 'navbar-front',
    templateUrl: 'navbar.component.html',
})

export class NavbarComponent extends BasicComponent implements OnInit{


    constructor(private userService: UserService,
                private pagerService: PagerService,
                private router: Router,
                private consignmentService: ConsignmentService,) {
        super(pagerService);
    }

    ngOnInit() {
        this.getAllConsignments();
    }

    routeToConsignmentDetail(item: ActiveConsignment) {
        this.router.navigate(['/consignment-detail', item.PackageId])
    }
}



@Directive({
    selector: "[click-stop-propagation]"
})
export class ClickStopPropagation {
    @HostListener("click", ["$event"])
    public onClick(event: any): void {
        event.stopPropagation();
    }
}