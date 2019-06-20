"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../_models/index");
var index_2 = require("../_services/index");
var BasicComponent = /** @class */ (function () {
    function BasicComponent(injector) {
        this.pager = new index_1.Pager();
        this.loading = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.pagerService = injector.get(index_2.PagerService);
        this.consignmentService = injector.get(index_2.ConsignmentService);
        this.userService = injector.get(index_2.UserService);
    }
    BasicComponent.prototype.orderBySelection = function (event, itemList) {
        return this.orderBy(event, itemList);
    };
    BasicComponent.prototype.orderBy = function (prop, itemList) {
        if (prop.charAt(0) === '-') {
            prop = prop.replace('-', '');
            itemList = itemList.sort(function (a, b) { return a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1; });
            itemList = itemList.reverse();
        }
        else
            itemList = itemList.sort(function (a, b) { return a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1; });
        // initialize pager to page 1
        return this.setPage(1, itemList);
    };
    BasicComponent.prototype.setPage = function (Page, itemList) {
        if (itemList.length <= 4)
            this.pagedItems = itemList;
        if (Page < 1 || Page > this.pager.TotalPages)
            return;
        // get pager object from service
        this.pager = this.pagerService.getPager(itemList.length, Page);
        // get current page of items
        this.pagedItems = itemList.slice(this.pager.StartIndex, this.pager.EndIndex + 1);
        return this.pagedItems;
    };
    BasicComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getAllUsers().subscribe(function (res) {
            _this.users = res;
        });
    };
    BasicComponent.prototype.getUserById = function (item) {
        var _this = this;
        this.user = this.users.filter(function (x) { return x.PersonId == item.ReceiverPersonId && x.PersonId != _this.currentUser.PersonId || x.PersonId == item.SenderPersonId && x.PersonId != _this.currentUser.PersonId; });
    };
    BasicComponent.prototype.getAllConsignments = function () {
        var _this = this;
        this.consignmentService.getAllConsignments().subscribe(function (res) {
            _this.allConsignments = res;
        });
    };
    BasicComponent.prototype.scrollToElement = function ($element) {
        console.log($element);
        $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    };
    BasicComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            template: ''
            //changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.Injector])
    ], BasicComponent);
    return BasicComponent;
}());
exports.BasicComponent = BasicComponent;
//# sourceMappingURL=basic.component.js.map