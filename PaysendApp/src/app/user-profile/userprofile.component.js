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
var index_1 = require("../_services/index");
var UserProfileComponent = /** @class */ (function () {
    function UserProfileComponent(userService, invitationService) {
        this.userService = userService;
        this.invitationService = invitationService;
        this.showDialog = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.isClassActive = false;
    }
    UserProfileComponent.prototype.ngOnInit = function () {
        this.getInvitations();
    };
    UserProfileComponent.prototype.getInvitations = function () {
        var _this = this;
        this.invitationService.getInvitations(this.currentUser.PersonId).subscribe(function (res) {
            _this.invitations = res;
        });
    };
    UserProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'userprofile.component.html',
        }),
        __metadata("design:paramtypes", [index_1.UserService,
            index_1.InvitationService])
    ], UserProfileComponent);
    return UserProfileComponent;
}());
exports.UserProfileComponent = UserProfileComponent;
//# sourceMappingURL=userprofile.component.js.map