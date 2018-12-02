import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Person, Invitation, Pager } from '../_models/index';
import 'rxjs/add/operator/map';

@Injectable()
export class PagerService {
    getPager(TotalItems:number, CurrentPage: number = 1, PageSize: number = 4) {
        // calculate total pages
        let TotalPages = Math.ceil(TotalItems / PageSize);

        let StartPage: number, EndPage: number;
        if (TotalPages <= 3) {
            // less than 3 total pages so show all
            StartPage = 1;
            EndPage = TotalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (CurrentPage <= 2) {
                StartPage = 1;
                EndPage = 3;
            } else if (CurrentPage + 1 >= TotalPages) {
                StartPage = TotalPages - 2;
                EndPage = TotalPages;
            } else {
                StartPage = CurrentPage - 1;
                EndPage = CurrentPage + 1;
            }
        }

        // calculate start and end item indexes
        let StartIndex = (CurrentPage - 1) * PageSize;
        let EndIndex = Math.min(StartIndex + PageSize - 1, TotalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let Pages = Array.from(Array((EndPage + 1) - StartPage).keys()).map(i => StartPage + i);

        // return object with all pager properties required by the view
        return {
            TotalItems: TotalItems,
            CurrentPage: CurrentPage,
            PageSize: PageSize,
            TotalPages: TotalPages,
            StartPage: StartPage,
            EndPage: EndPage,
            StartIndex: StartIndex,
            EndIndex: EndIndex,
            Pages: Pages,
        };
    }
}
