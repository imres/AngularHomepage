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
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var router_1 = require("@angular/router");
var basic_component_1 = require("../../shared/basic.component");
var index_1 = require("../../_services/index");
var index_2 = require("../../_models/enums/index");
var ActiveInvitationComponent = /** @class */ (function (_super) {
    __extends(ActiveInvitationComponent, _super);
    function ActiveInvitationComponent(injector, cd, dialogService, invitationService, consignmentService, toastr, toastrService, paymentService, filterService, pagerService, router, activatedRoute) {
        var _this = _super.call(this, injector) || this;
        _this.cd = cd;
        _this.dialogService = dialogService;
        _this.invitationService = invitationService;
        _this.consignmentService = consignmentService;
        _this.toastr = toastr;
        _this.toastrService = toastrService;
        _this.paymentService = paymentService;
        _this.filterService = filterService;
        _this.pagerService = pagerService;
        _this.router = router;
        _this.activatedRoute = activatedRoute;
        _this.invitationStatus = index_2.InvitationStatusEnum;
        _this.showPackageIdForm = false;
        _this.showPopover = false;
        _this.loadingPayment = false;
        _this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        _this.activeInvitations = _this.invitations != null ? _this.invitations : null;
        return _this;
    }
    ActiveInvitationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getInvitations();
        this.invitationService.invitationList.subscribe(function (invitations) {
            if (!invitations)
                return;
            _this.activeInvitations = invitations.filter(function (x) { return x.Status > index_2.InvitationStatusEnum.Created && x.Status < index_2.InvitationStatusEnum.ConsignmentActive; });
            _this.orderBy('-StartDate', _this.activeInvitations);
        });
        this.getUsers();
        this.ConfigStripeCheckout();
    };
    ActiveInvitationComponent.prototype.openCheckout = function (invitation) {
        this.invitationToPay = invitation;
        this.handler.open({
            name: invitation.Title,
            description: invitation.Description,
            amount: invitation.RequestedDepositAmount * 100
        });
    };
    ActiveInvitationComponent.prototype.ConfigStripeCheckout = function () {
        var _this = this;
        this.handler = window.StripeCheckout.configure({
            key: 'pk_test_8KkoVLMTzkhfC13XXvKHEuMO',
            locale: 'auto',
            currency: "sek",
            token: function (token) {
                // You can access the token ID with `token.id`.
                // Get the token ID to your server-side code for use.
                console.log("token", token);
                _this.loadingPayment = true;
                _this.loadingPaymentId = _this.invitationToPay.Id;
                _this.paymentService.processPayment(_this.invitationToPay, token.email, token.id).subscribe(function () {
                    _this.filterService.updateInvitationStatus(_this.invitations, _this.invitationToPay, index_2.InvitationStatusEnum.AmountDeposited);
                    _this.toastrService.ShowToastr(true, false, true, "Betalning skickades!");
                    _this.loadingPayment = false;
                    _this.loadingPaymentId = 0;
                });
            }
        });
    };
    ActiveInvitationComponent.prototype.getInvitations = function () {
        var _this = this;
        this.invitationService.getInvitations(this.currentUser.PersonId).subscribe(function (res) {
            _this.invitations = res;
            if (_this.invitations != null)
                _this.activeInvitations = _this.invitations.filter(function (x) { return x.Status > index_2.InvitationStatusEnum.Created && x.Status < index_2.InvitationStatusEnum.ConsignmentActive; });
            _this.orderBy('-StartDate', _this.activeInvitations);
            console.log(_this.activeInvitations);
        });
    };
    ActiveInvitationComponent.prototype.savePackageId = function () {
        var _this = this;
        var invitation = this.invitationExtended;
        this.invitationService.savePackageId(this.invitationExtended).subscribe(function (res) {
            _this.cancelPackageIdForm();
            console.log("savePackageId res:", res);
            _this.invitations = _this.filterService.removeFromListByProperty(_this.invitations, invitation);
            _this.invitationService.updateInvitations(_this.invitations);
            _this.consignmentService.updateConsignments(res);
        });
    };
    ActiveInvitationComponent.prototype.matchesInvitationWithPackageId = function (invitation) {
        if (this.invitationExtended == null)
            return false;
        return this.invitationExtended.Id == invitation.Id ? true : false;
    };
    ActiveInvitationComponent.prototype.packageIdFormOpened = function (invitation) {
        return this.matchesInvitationWithPackageId(invitation);
    };
    ActiveInvitationComponent.prototype.cancelPackageIdForm = function () {
        this.invitationExtended = null;
    };
    ActiveInvitationComponent.prototype.enterPackageId = function (invitation) {
        this.cancelPackageIdForm();
        this.invitationExtended = invitation;
    };
    ActiveInvitationComponent.prototype.HasReceiverRole = function (invitation) {
        return invitation.ReceiverPersonId == this.currentUser.PersonId ? true : false;
    };
    ActiveInvitationComponent.prototype.translatePaymentStatus = function (invite) {
        if (this.HasReceiverRole(invite) && invite.Status == this.invitationStatus.Accepted) {
            return 'Säljaren väntar på din betalning';
        }
        else if (!this.HasReceiverRole(invite) && invite.Status == this.invitationStatus.Accepted) {
            return 'Väntar på betalning från köparen';
        }
        else if (invite.Status == this.invitationStatus.AmountDeposited) {
            return 'Betald';
        }
    };
    ActiveInvitationComponent.prototype.routeToUserProfile = function (user) {
        this.router.navigate(['/user', user.PersonId]);
    };
    ActiveInvitationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'active-invitation',
            templateUrl: 'active-invitation.component.html'
        }),
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.Injector,
            core_1.ChangeDetectorRef,
            ng2_bootstrap_modal_1.DialogService,
            index_1.InvitationService,
            index_1.ConsignmentService,
            ng2_toastr_1.ToastsManager,
            index_1.ToastrService,
            index_1.PaymentService,
            index_1.FilterService,
            index_1.PagerService,
            router_1.Router,
            router_1.ActivatedRoute])
    ], ActiveInvitationComponent);
    return ActiveInvitationComponent;
}(basic_component_1.BasicComponent));
exports.ActiveInvitationComponent = ActiveInvitationComponent;
//# sourceMappingURL=active-invitation.component.js.map