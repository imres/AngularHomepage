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
var index_2 = require("../../_models/enums/index");
var UnrespondedInvitesComponent = /** @class */ (function () {
    function UnrespondedInvitesComponent(cd, dialogService, invitationService, toastr, toastrService) {
        this.cd = cd;
        this.dialogService = dialogService;
        this.invitationService = invitationService;
        this.toastr = toastr;
        this.toastrService = toastrService;
        //unrespondedInvitations: Invitation[];
        this.maxSliceValue = 4;
        this.minSliceValue = 0;
        this.showAllInvitationsEnabled = false;
        this.invitationStatus = new index_2.InvitationStatusEnum;
        this.showInvitations = true;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    UnrespondedInvitesComponent.prototype.ngOnInit = function () {
    };
    UnrespondedInvitesComponent.prototype.incrementSliceValue = function () {
        if (this.maxSliceValue >= this.unrespondedInvitations.length)
            return;
        this.maxSliceValue += 4;
        this.minSliceValue += 4;
    };
    UnrespondedInvitesComponent.prototype.incrementSliceValueTwice = function () {
        this.maxSliceValue += 8;
        this.minSliceValue += 8;
    };
    UnrespondedInvitesComponent.prototype.decrementSliceValue = function () {
        if (this.minSliceValue >= 4) {
            this.maxSliceValue -= 4;
            this.minSliceValue -= 4;
        }
    };
    UnrespondedInvitesComponent.prototype.decrementSliceValueTwice = function () {
        this.maxSliceValue -= 8;
        this.minSliceValue -= 8;
    };
    //multiplySliceValue() {
    //    this.maxSliceValue = this.paginationNumber * 10;
    //}
    UnrespondedInvitesComponent.prototype.showAllInvitations = function () {
        this.maxSliceValue = this.unrespondedInvitations.length;
        this.minSliceValue = 0;
        this.showAllInvitationsEnabled = true;
    };
    UnrespondedInvitesComponent.prototype.maximizeSliceValue = function () {
        if (this.unrespondedInvitations.length % 4 > 0) {
            this.maxSliceValue = this.unrespondedInvitations.length + (4 - (this.unrespondedInvitations.length % 4)); //Om antalet invitations inte är delbart på 4, ska den ändå visa rätt invites på sista sidan
            this.minSliceValue = this.maxSliceValue - 4;
        }
        else {
            this.maxSliceValue = this.unrespondedInvitations.length;
            this.minSliceValue = this.maxSliceValue - 4;
        }
    };
    UnrespondedInvitesComponent.prototype.resetSliceValue = function () {
        this.maxSliceValue = 4;
        this.minSliceValue = 0;
        this.showAllInvitationsEnabled = false;
    };
    UnrespondedInvitesComponent.prototype.hideInvites = function () {
        this.showInvitations = false;
    };
    UnrespondedInvitesComponent.prototype.showInvites = function () {
        this.showInvitations = true;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], UnrespondedInvitesComponent.prototype, "unrespondedInvitations", void 0);
    UnrespondedInvitesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'unresponded-invites',
            templateUrl: 'unresponded-invites.component.html'
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            ng2_bootstrap_modal_1.DialogService,
            index_1.InvitationService,
            ng2_toastr_1.ToastsManager,
            index_1.ToastrService])
    ], UnrespondedInvitesComponent);
    return UnrespondedInvitesComponent;
}());
exports.UnrespondedInvitesComponent = UnrespondedInvitesComponent;
//# sourceMappingURL=unresponded-invites.component.js.map