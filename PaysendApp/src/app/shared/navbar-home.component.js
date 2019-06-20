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
var basic_component_1 = require("../shared/basic.component");
var index_1 = require("../_services/index");
var send_invitation_dialog_component_1 = require("../_dialog/send-invitation-dialog.component");
var index_2 = require("../_models/enums/index");
var NavbarHomeComponent = /** @class */ (function (_super) {
    __extends(NavbarHomeComponent, _super);
    function NavbarHomeComponent(injector, userService, invitationService, cd, dialogService, consignmentService, toastrService, pagerService, router, activatedRoute) {
        var _this = _super.call(this, injector) || this;
        _this.userService = userService;
        _this.invitationService = invitationService;
        _this.cd = cd;
        _this.dialogService = dialogService;
        _this.consignmentService = consignmentService;
        _this.toastrService = toastrService;
        _this.pagerService = pagerService;
        _this.router = router;
        _this.activatedRoute = activatedRoute;
        _this.showDialog = false;
        _this.invitationStatus = index_2.InvitationStatusEnum;
        _this.notifications = 0;
        _this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        _this.isClassActive = false;
        return _this;
    }
    NavbarHomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getInvitations();
        this.getFinishedConsignments();
        this.getAllConsignments();
        this.getUsers();
        this.invitationService.invitationList.subscribe(function (invitations) {
            _this.invitations = invitations;
            _this.updateFilteredInvitations();
        });
    };
    NavbarHomeComponent.prototype.updateFilteredInvitations = function () {
        var _this = this;
        if (!this.invitations || !this.currentUser || !this.currentUser.PersonId)
            return;
        this.invitationNotifications = this.invitations.filter(function (x) {
            return x.Status == index_2.InvitationStatusEnum.Created && x.InvitationInitiatorPersonId != _this.currentUser.PersonId;
        });
        this.notificationCounter();
    };
    NavbarHomeComponent.prototype.notificationCounter = function () {
        if (!this.invitationNotifications && this.pagedItems)
            this.notifications = this.pagedItems.length;
        if (!this.pagedItems && this.invitationNotifications)
            this.notifications = this.invitationNotifications.length;
        if (this.pagedItems && this.invitationNotifications)
            this.notifications = this.invitationNotifications.length + this.pagedItems.length;
    };
    NavbarHomeComponent.prototype.getInvitations = function () {
        var _this = this;
        this.invitationService.getInvitations(this.currentUser.PersonId).subscribe(function (invitations) {
            console.log("Hämtade invites från API");
            if (invitations == null)
                return;
            _this.invitations = invitations;
            //this.updateFilteredInvitations();
            _this.invitationService.updateInvitations(invitations);
        }, function (err) { console.log("Error: {0}", err); });
    };
    NavbarHomeComponent.prototype.getFinishedConsignments = function () {
        var _this = this;
        this.consignmentService.getFinishedConsignments(this.currentUser.PersonId).subscribe(function (res) {
            _this.finishedConsignments = res;
            _this.orderBy('-EndDate', res);
            _this.notificationCounter();
        });
    };
    NavbarHomeComponent.prototype.showConfirm = function (event) {
        var _this = this;
        this.dialogService.addDialog(send_invitation_dialog_component_1.SendInvitationDialogComponent, {
            title: 'Skicka inbjudan',
            message: 'Bla bla confirm some action?'
        })
            .subscribe(function (isConfirmed) {
            //Get dialog result
            _this.confirmResult = isConfirmed;
            _this.toastrService.ShowToastr(isConfirmed, false, "Inbjudan skickades");
        });
    };
    NavbarHomeComponent.prototype.routeToConsignmentDetail = function (item) {
        this.router.navigate(['/consignment-detail', item.PackageId]);
        this.searchText = '';
    };
    NavbarHomeComponent.prototype.routeToUserProfile = function (item) {
        if (this.currentUser.PersonId != item.PersonId)
            this.router.navigate(['/user', item.PersonId]);
        if (this.currentUser.PersonId == item.PersonId)
            this.router.navigate(['/profile']);
        this.searchText = '';
    };
    NavbarHomeComponent.prototype.logOut = function () {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NavbarHomeComponent.prototype, "invitations", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NavbarHomeComponent.prototype, "invitationNotifications", void 0);
    NavbarHomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'navbar-home.component.html',
            selector: 'navbar-home'
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            index_1.UserService,
            index_1.InvitationService,
            core_1.ChangeDetectorRef,
            ng2_bootstrap_modal_1.DialogService,
            index_1.ConsignmentService,
            index_1.ToastrService,
            index_1.PagerService,
            router_1.Router,
            router_1.ActivatedRoute])
    ], NavbarHomeComponent);
    return NavbarHomeComponent;
}(basic_component_1.BasicComponent));
exports.NavbarHomeComponent = NavbarHomeComponent;
//# sourceMappingURL=navbar-home.component.js.map