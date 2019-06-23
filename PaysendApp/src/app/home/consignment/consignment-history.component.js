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
var ng2_bootstrap_modal_1 = require("ng2-bootstrap-modal");
var router_1 = require("@angular/router");
var basic_component_1 = require("../../shared/basic.component");
var index_1 = require("../../_models/index");
var index_2 = require("../../_services/index");
var send_invitation_dialog_component_1 = require("../../_dialog/send-invitation-dialog.component");
var ConsignmentHistoryComponent = /** @class */ (function (_super) {
    __extends(ConsignmentHistoryComponent, _super);
    function ConsignmentHistoryComponent(injector, cd, dialogService, consignmentService, toastrService, pagerService, router) {
        var _this = _super.call(this, injector) || this;
        _this.cd = cd;
        _this.dialogService = dialogService;
        _this.consignmentService = consignmentService;
        _this.toastrService = toastrService;
        _this.pagerService = pagerService;
        _this.router = router;
        // pager object
        _this.pager = new index_1.Pager();
        _this.confirmResult = null;
        _this.showAllConsignmentsEnabled = false;
        _this.showConsignments = true;
        _this.loading = false;
        _this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return _this;
    }
    ConsignmentHistoryComponent.prototype.ngOnInit = function () {
        this.getArchivedConsignments();
        this.getFinishedConsignments();
    };
    ConsignmentHistoryComponent.prototype.getArchivedConsignments = function () {
        var _this = this;
        this.consignmentService.getArchivedConsignments(this.currentUser.PersonId).subscribe(function (res) {
            _this.archivedConsignments = res;
            // initialize pager to page 1
            _this.orderBy('-EndDate', _this.archivedConsignments);
        });
    };
    ConsignmentHistoryComponent.prototype.getFinishedConsignments = function () {
        var _this = this;
        this.consignmentService.getFinishedConsignments(this.currentUser.PersonId).subscribe(function (res) {
            _this.finishedConsignments = res;
            console.log(res);
        });
    };
    ConsignmentHistoryComponent.prototype.showInvite = function (invite) {
        console.log(invite);
    };
    ConsignmentHistoryComponent.prototype.showConfirm = function (event) {
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
    ConsignmentHistoryComponent.prototype.routeToConsignmentDetail = function (item) {
        this.router.navigate(['/consignment-detail', item.PackageId]);
    };
    ConsignmentHistoryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'consignment-history.component.html',
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            core_1.ChangeDetectorRef,
            ng2_bootstrap_modal_1.DialogService,
            index_2.ConsignmentService,
            index_2.ToastrService,
            index_2.PagerService,
            router_1.Router])
    ], ConsignmentHistoryComponent);
    return ConsignmentHistoryComponent;
}(basic_component_1.BasicComponent));
exports.ConsignmentHistoryComponent = ConsignmentHistoryComponent;
//# sourceMappingURL=consignment-history.component.js.map