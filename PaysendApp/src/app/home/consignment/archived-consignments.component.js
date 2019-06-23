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
var ng2_bootstrap_modal_1 = require("ng2-bootstrap-modal");
var index_1 = require("../../_models/index");
var index_2 = require("../../_services/index");
var confirm_component_1 = require("../../_dialog/confirm.component");
var ArchivedConsignmentComponent = /** @class */ (function () {
    function ArchivedConsignmentComponent(cd, dialogService, consignmentService, toastrService, pagerService) {
        this.cd = cd;
        this.dialogService = dialogService;
        this.consignmentService = consignmentService;
        this.toastrService = toastrService;
        this.pagerService = pagerService;
        // pager object
        this.pager = new index_1.Pager();
        this.confirmResult = null;
        this.showAllConsignmentsEnabled = false;
        this.showConsignments = true;
        this.loading = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    ArchivedConsignmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getArchivedConsignments();
        this.consignmentService.consignmentList.subscribe(function (consignments) {
            if (!_this.consignments)
                return;
            _this.consignments = _this.consignments.concat(consignments);
        });
    };
    ArchivedConsignmentComponent.prototype.getArchivedConsignments = function () {
        var _this = this;
        this.consignmentService.getArchivedConsignments(this.currentUser.PersonId).subscribe(function (res) {
            _this.archivedConsignments = res;
            _this.consignments = _this.consignments.concat(_this.archivedConsignments);
        });
        // initialize pager to page 1
        this.setPage(1);
    };
    ArchivedConsignmentComponent.prototype.setPage = function (Page) {
        if (Page < 1 || Page > this.pager.TotalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.consignments.length, Page);
        // get current page of items
        this.pagedItems = this.consignments.slice(this.pager.StartIndex, this.pager.EndIndex + 1);
    };
    ArchivedConsignmentComponent.prototype.showInvite = function (invite) {
        console.log(invite);
    };
    ArchivedConsignmentComponent.prototype.showConfirm = function (event) {
        var _this = this;
        this.dialogService.addDialog(confirm_component_1.ConfirmComponent, {
            title: 'Skicka inbjudan',
            message: 'Bla bla confirm some action?'
        })
            .subscribe(function (isConfirmed) {
            //Get dialog result
            _this.confirmResult = isConfirmed;
            _this.toastrService.ShowToastr(isConfirmed, false, true, "Inbjudan skickades");
        });
    };
    ArchivedConsignmentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'archived-consignment.component.html'
            //changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            ng2_bootstrap_modal_1.DialogService,
            index_2.ConsignmentService,
            index_2.ToastrService,
            index_2.PagerService])
    ], ArchivedConsignmentComponent);
    return ArchivedConsignmentComponent;
}());
exports.ArchivedConsignmentComponent = ArchivedConsignmentComponent;
//# sourceMappingURL=archived-consignments.component.js.map