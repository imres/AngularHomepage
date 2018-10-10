import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { DialogService } from "ng2-bootstrap-modal";

import { Person, Invitation, Consignment, ActiveConsignment, Pager } from '../_models/index';
import { UserService, InvitationService, ConsignmentService, ToastrService, PagerService } from '../_services/index';
import { ConfirmComponent } from '../_dialog/confirm.component';
import { InviteResponseComponent } from '../_dialog/invite-response.component';

@Component({
    moduleId: module.id,
    template: ''
    //changeDetection: ChangeDetectionStrategy.OnPush
})

export class BasicComponent
{
    pager: Pager = new Pager();
    pagedItems: any[];
    allConsignments: ActiveConsignment[];
    users: Person[];

    constructor(private pagerService: PagerService,
        private consignmentService: ConsignmentService,
        private userService: UserService,
        ) {

    }

    orderBySelection(event: any, itemList: any[]): any[] {
        return this.orderBy(event, itemList);
    }

    public orderBy(prop: string, itemList: any[]): any[] {
        if (prop.charAt(0) === '-') {
            prop = prop.replace('-', '');
            itemList = itemList.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
            itemList = itemList.reverse();
        }
        else
            itemList = itemList.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);

        // initialize pager to page 1
        return this.setPage(1, itemList);
    }


    public setPage(Page: number, itemList: any[]): any[] {
        if (itemList.length <= 4)
            this.pagedItems = itemList;

        if (Page < 1 || Page > this.pager.TotalPages) 
            return;
        

        // get pager object from service
        this.pager = this.pagerService.getPager(itemList.length, Page);

        // get current page of items
        this.pagedItems = itemList.slice(this.pager.StartIndex, this.pager.EndIndex + 1);

        return this.pagedItems;
    }

    getUsers() {
        this.userService.getAllUsers().subscribe(res => {
            this.users = res;
        });
    }

    getAllConsignments() {
        this.consignmentService.getAllConsignments().subscribe(res => {
            this.allConsignments = res;
        });
    }
}
