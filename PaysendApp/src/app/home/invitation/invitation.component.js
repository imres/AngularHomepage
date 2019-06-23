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
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var index_1 = require("../../_services/index");
var invitation_response_dialog_component_1 = require("../../_dialog/invitation-response-dialog.component");
var index_2 = require("../../_models/enums/index");
var InvitationComponent = /** @class */ (function () {
    function InvitationComponent(cd, dialogService, invitationService, toastr, toastrService, filterService) {
        this.cd = cd;
        this.dialogService = dialogService;
        this.invitationService = invitationService;
        this.toastr = toastr;
        this.toastrService = toastrService;
        this.filterService = filterService;
        this.confirmResult = null;
        this.invitationStatus = index_2.InvitationStatusEnum;
    }
    InvitationComponent.prototype.ngOnInit = function () {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    };
    InvitationComponent.prototype.updateInvitationList = function (invitation) {
        this.invitationService.updateInvitations(this.invitations);
    };
    InvitationComponent.prototype.showInviteResponseDialog = function (invitation) {
        var _this = this;
        this.dialogService.addDialog(invitation_response_dialog_component_1.InvitationResponseDialogComponent, {
            title: this.HasReceiverRole(invitation) ? "Mottagare" : "Avsändare",
            message: 'Bla bla confirm some action?',
            currentInvitation: invitation
        })
            .subscribe(function (isConfirmed) {
            //Get dialog result
            _this.confirmResult = isConfirmed;
            if (isConfirmed == null)
                return;
            _this.toastrService.ShowToastr(isConfirmed, false, "Inbjudan accepterad, försändelse skapad");
            _this.handleDialogResult(invitation, isConfirmed);
            _this.updateInvitationList(invitation);
        });
    };
    InvitationComponent.prototype.handleDialogResult = function (invitation, isConfirmed) {
        if (isConfirmed)
            this.filterService.updateInvitationStatus(this.invitations, invitation, index_2.InvitationStatusEnum.Accepted);
        else
            this.filterService.removeFromListByProperty(this.invitations, invitation);
    };
    InvitationComponent.prototype.HasReceiverRole = function (invitation) {
        if (invitation.ReceiverPersonId == this.currentUser.PersonId) {
            return true;
        }
        else {
            return false;
        }
    };
    InvitationComponent.prototype.cancel = function (invite) {
        //Skicka till service och ta bort invite, kalla på toastr på success
        var inviteAccepted = false;
        this.invitationService.endInvite(invite.Id).subscribe(function (res) {
        }, function (err) { return console.log(err); });
        this.result = false;
        this.close();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], InvitationComponent.prototype, "invitations", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], InvitationComponent.prototype, "invitationNotifications", void 0);
    InvitationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'invite-notifications',
            templateUrl: 'invitation.component.html'
            //changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            ng2_bootstrap_modal_1.DialogService,
            index_1.InvitationService,
            ng2_toastr_1.ToastsManager,
            index_1.ToastrService,
            index_1.FilterService])
    ], InvitationComponent);
    return InvitationComponent;
}());
exports.InvitationComponent = InvitationComponent;
//# sourceMappingURL=invitation.component.js.map