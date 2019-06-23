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
var index_1 = require("../_models/index");
var index_2 = require("../_services/index");
var UserSettingsComponent = /** @class */ (function () {
    function UserSettingsComponent(userService, alertService) {
        this.userService = userService;
        this.alertService = alertService;
        this.model = new index_1.User;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    UserSettingsComponent.prototype.ngOnInit = function () {
    };
    UserSettingsComponent.prototype.updateAccount = function () {
        var _this = this;
        this.userService.update(this.currentUser).subscribe(function (res) {
            _this.currentUser = res;
        });
        this.editActive = false;
    };
    UserSettingsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'user-settings.component.html',
            selector: 'user-settings',
        }),
        __metadata("design:paramtypes", [index_2.UserService,
            index_2.AlertService])
    ], UserSettingsComponent);
    return UserSettingsComponent;
}());
exports.UserSettingsComponent = UserSettingsComponent;
//# sourceMappingURL=user-settings.component.js.map