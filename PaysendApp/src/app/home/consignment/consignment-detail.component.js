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
var ng2_bootstrap_modal_1 = require("ng2-bootstrap-modal");
var basic_component_1 = require("../../shared/basic.component");
var index_1 = require("../../_services/index");
var send_invitation_dialog_component_1 = require("../../_dialog/send-invitation-dialog.component");
var ConsignmentDetailComponent = /** @class */ (function (_super) {
    __extends(ConsignmentDetailComponent, _super);
    function ConsignmentDetailComponent(injector, cd, dialogService, consignmentService, toastrService, pagerService, activatedRoute) {
        var _this = _super.call(this, injector) || this;
        _this.cd = cd;
        _this.dialogService = dialogService;
        _this.consignmentService = consignmentService;
        _this.toastrService = toastrService;
        _this.pagerService = pagerService;
        _this.activatedRoute = activatedRoute;
        _this.confirmResult = null;
        _this.loading = false;
        _this.eventsLength = 3;
        _this.showEvents = false;
        _this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return _this;
    }
    ConsignmentDetailComponent.prototype.ngOnInit = function () {
        this.getAllConsignments();
    };
    ConsignmentDetailComponent.prototype.getAllConsignments = function () {
        var _this = this;
        this.consignmentService.getAllConsignments().subscribe(function (res) {
            _this.allConsignments = res;
            _this.getSelectedConsignmentPackageId();
        });
    };
    ConsignmentDetailComponent.prototype.getSelectedConsignmentPackageId = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (res) {
            _this.selectedConsignmentPackageId = res.PackageId;
            _this.getSelectedConsignment();
        });
    };
    ConsignmentDetailComponent.prototype.getSelectedConsignment = function () {
        var _this = this;
        this.selectedConsignment = this.allConsignments.filter(function (x) { return x.PackageId == _this.selectedConsignmentPackageId; });
        console.log(this.selectedConsignment);
        if (this.selectedConsignment) {
            var eventList = this.selectedConsignment.map(function (x) { return x.Events; });
            this.events = eventList[0];
            if (this.events)
                this.events.sort(function (a, b) { return a['eventTime'] > b['eventTime'] ? 1 : a['eventTime'] === b['eventTime'] ? 0 : -1; }).reverse();
        }
        this.loading = false;
    };
    ConsignmentDetailComponent.prototype.showConfirm = function (event) {
        var _this = this;
        this.dialogService.addDialog(send_invitation_dialog_component_1.SendInvitationDialogComponent, {
            title: 'Skicka inbjudan',
            message: 'Bla bla confirm some action?'
        })
            .subscribe(function (isConfirmed) {
            //Get dialog result
            _this.confirmResult = isConfirmed;
            _this.toastrService.ShowToastr(isConfirmed, false, true, "Inbjudan skickades");
        });
    };
    ConsignmentDetailComponent.prototype.showAllEvents = function () {
        if (this.showEvents) {
            this.eventsLength = 3;
            this.showEvents = false;
            return;
        }
        if (!this.showEvents) {
            this.eventsLength = this.events.length;
            this.showEvents = true;
            return;
        }
    };
    ConsignmentDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'consignment-detail.component.html'
            //changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            core_1.ChangeDetectorRef,
            ng2_bootstrap_modal_1.DialogService,
            index_1.ConsignmentService,
            index_1.ToastrService,
            index_1.PagerService,
            router_1.ActivatedRoute])
    ], ConsignmentDetailComponent);
    return ConsignmentDetailComponent;
}(basic_component_1.BasicComponent));
exports.ConsignmentDetailComponent = ConsignmentDetailComponent;
//# sourceMappingURL=consignment-detail.component.js.map