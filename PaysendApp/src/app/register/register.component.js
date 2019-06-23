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
var index_1 = require("../_models/index");
var index_2 = require("../_services/index");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(router, route, userService, alertService, authenticationService) {
        this.router = router;
        this.route = route;
        this.userService = userService;
        this.alertService = alertService;
        this.authenticationService = authenticationService;
        this.model = new index_1.Person();
        this.loading = false;
        this.bankIdPending = false;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(function (data) {
            _this.alertService.success('Registration successful', true);
            _this.router.navigate(['/login']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    RegisterComponent.prototype.bankIdAuth = function () {
        var _this = this;
        this.authenticationService.bankIdAuth(this.model.PersonId)
            .subscribe(function (res) {
            _this.bankIdPending = true;
            _this.authenticationService.bankIdCollect(res).subscribe(function (data) {
                _this.bankIdPending = false;
                _this.router.navigate([_this.returnUrl]);
            }, function (error) {
                _this.bankIdPending = false;
                _this.alertService.error(error);
            });
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'register.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            index_2.UserService,
            index_2.AlertService,
            index_2.AuthenticationService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map