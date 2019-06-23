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
var router_1 = require("@angular/router");
var index_1 = require("../_services/index");
var UserComponent = /** @class */ (function () {
    function UserComponent(userService, activatedRoute) {
        this.userService = userService;
        this.activatedRoute = activatedRoute;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    UserComponent.prototype.ngOnInit = function () {
        this.getAllUsers();
    };
    UserComponent.prototype.getAllUsers = function () {
        var _this = this;
        this.userService.getAllUsers().subscribe(function (res) {
            _this.users = res;
            _this.getSelectedUserId();
        });
    };
    UserComponent.prototype.getSelectedUserId = function () {
        //this.selectedUserPersonId = this.activatedRoute.snapshot.params['PersonId'];
        var _this = this;
        this.activatedRoute.params.subscribe(function (res) {
            _this.selectedUserPersonId = res.PersonId;
            _this.getSelectedUser();
        });
    };
    UserComponent.prototype.getSelectedUser = function () {
        var _this = this;
        this.selectedUser = this.users.filter(function (x) { return x.PersonId == _this.selectedUserPersonId; });
    };
    UserComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'user.component.html',
        }),
        __metadata("design:paramtypes", [index_1.UserService,
            router_1.ActivatedRoute])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map