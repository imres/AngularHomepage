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
var send_invitation_dialog_component_1 = require("../_dialog/send-invitation-dialog.component");
var index_1 = require("../_services/index");
var FriendsComponent = /** @class */ (function () {
    function FriendsComponent(cd, dialogService, userService, alertService, toastrService) {
        this.cd = cd;
        this.dialogService = dialogService;
        this.userService = userService;
        this.alertService = alertService;
        this.toastrService = toastrService;
        this.confirmResult = null;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    FriendsComponent.prototype.ngOnInit = function () {
    };
    FriendsComponent.prototype.showConfirm = function (event) {
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
    FriendsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'friends.component.html',
            selector: 'friends',
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            ng2_bootstrap_modal_1.DialogService,
            index_1.UserService,
            index_1.AlertService,
            index_1.ToastrService])
    ], FriendsComponent);
    return FriendsComponent;
}());
exports.FriendsComponent = FriendsComponent;
//# sourceMappingURL=friends.component.js.map