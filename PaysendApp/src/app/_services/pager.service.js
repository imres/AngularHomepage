"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var PagerService = /** @class */ (function () {
    function PagerService() {
    }
    PagerService.prototype.getPager = function (TotalItems, CurrentPage, PageSize) {
        if (CurrentPage === void 0) { CurrentPage = 1; }
        if (PageSize === void 0) { PageSize = 4; }
        // calculate total pages
        var TotalPages = Math.ceil(TotalItems / PageSize);
        var StartPage, EndPage;
        if (TotalPages <= 3) {
            // less than 3 total pages so show all
            StartPage = 1;
            EndPage = TotalPages;
        }
        else {
            // more than 10 total pages so calculate start and end pages
            if (CurrentPage <= 2) {
                StartPage = 1;
                EndPage = 3;
            }
            else if (CurrentPage + 1 >= TotalPages) {
                StartPage = TotalPages - 2;
                EndPage = TotalPages;
            }
            else {
                StartPage = CurrentPage - 1;
                EndPage = CurrentPage + 1;
            }
        }
        // calculate start and end item indexes
        var StartIndex = (CurrentPage - 1) * PageSize;
        var EndIndex = Math.min(StartIndex + PageSize - 1, TotalItems - 1);
        // create an array of pages to ng-repeat in the pager control
        var Pages = Array.from(Array((EndPage + 1) - StartPage).keys()).map(function (i) { return StartPage + i; });
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
    };
    PagerService = __decorate([
        core_1.Injectable()
    ], PagerService);
    return PagerService;
}());
exports.PagerService = PagerService;
//# sourceMappingURL=pager.service.js.map