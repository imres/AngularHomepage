"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var router_1 = require("@angular/router");
var basic_component_1 = require("../../shared/basic.component");
var index_1 = require("../../_services/index");
var ConsignmentNotificationComponent = /** @class */ (function (_super) {
    __extends(ConsignmentNotificationComponent, _super);
    function ConsignmentNotificationComponent(injector, consignmentService, pagerService, router) {
        var _this = _super.call(this, injector) || this;
        _this.consignmentService = consignmentService;
        _this.pagerService = pagerService;
        _this.router = router;
        _this.confirmResult = null;
        _this.loading = false;
        _this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return _this;
    }
    ConsignmentNotificationComponent.prototype.ngOnInit = function () {
        this.getFinishedConsignments();
    };
    ConsignmentNotificationComponent.prototype.getFinishedConsignments = function () {
        var _this = this;
        this.consignmentService.getFinishedConsignments(this.currentUser.PersonId).subscribe(function (res) {
            _this.finishedConsignments = res;
            _this.orderBy('-EndDate', _this.finishedConsignments);
        });
    };
    ConsignmentNotificationComponent.prototype.routeToConsignmentDetail = function (item) {
        this.archiveConsignment(item);
        this.router.navigate(['/consignment-detail', item.PackageId]);
    };
    ConsignmentNotificationComponent.prototype.archiveConsignment = function (item) {
        var _this = this;
        this.consignmentService.archiveConsignment(item.PackageId).subscribe(function (res) {
            console.log("archive res: ", res);
            _this.getFinishedConsignments();
        });
    };
    ConsignmentNotificationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'consignment-notification.component.html',
            selector: 'consignment-notification',
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            index_1.ConsignmentService,
            index_1.PagerService,
            router_1.Router])
    ], ConsignmentNotificationComponent);
    return ConsignmentNotificationComponent;
}(basic_component_1.BasicComponent));
exports.ConsignmentNotificationComponent = ConsignmentNotificationComponent;
//# sourceMappingURL=consignment-notification.component.js.map