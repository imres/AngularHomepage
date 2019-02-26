import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, Injector} from '@angular/core';
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
    protected pagerService: PagerService;
    protected consignmentService: ConsignmentService;
    protected userService: UserService;

    pager: Pager = new Pager();
    pagedItems: any[];
    consignments: ActiveConsignment[];
    allConsignments: ActiveConsignment[];
    users: Person[];
    user: Person[];
    currentUser: Person;
    loading = false;

    constructor(injector: Injector) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        this.pagerService = injector.get(PagerService);
        this.consignmentService = injector.get(ConsignmentService);
        this.userService = injector.get(UserService);
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

    getUserById(item: any) {
        this.user = this.users.filter(x => x.PersonId == item.ReceiverPersonId && x.PersonId != this.currentUser.PersonId || x.PersonId == item.SenderPersonId && x.PersonId != this.currentUser.PersonId);
    }

    getAllConsignments() {
        this.consignmentService.getAllConsignments().subscribe(res => {
            this.allConsignments = res;
        });
    }
}
