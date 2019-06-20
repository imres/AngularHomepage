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
var router_1 = require("@angular/router");
var basic_component_1 = require("../shared/basic.component");
var index_1 = require("../_services/index");
var core_2 = require("@angular/core");
var NavbarComponent = /** @class */ (function (_super) {
    __extends(NavbarComponent, _super);
    function NavbarComponent(injector, userService, pagerService, router, consignmentService) {
        var _this = _super.call(this, injector) || this;
        _this.userService = userService;
        _this.pagerService = pagerService;
        _this.router = router;
        _this.consignmentService = consignmentService;
        return _this;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.getAllConsignments();
        this.getUsers();
    };
    NavbarComponent.prototype.routeToConsignmentDetail = function (item) {
        this.router.navigate(['/consignment-detail', item.PackageId]);
    };
    NavbarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'navbar-front',
            templateUrl: 'navbar.component.html',
        }),
        __metadata("design:paramtypes", [core_1.Injector,
            index_1.UserService,
            index_1.PagerService,
            router_1.Router,
            index_1.ConsignmentService])
    ], NavbarComponent);
    return NavbarComponent;
}(basic_component_1.BasicComponent));
exports.NavbarComponent = NavbarComponent;
var ClickStopPropagation = /** @class */ (function () {
    function ClickStopPropagation() {
    }
    ClickStopPropagation.prototype.onClick = function (event) {
        event.stopPropagation();
    };
    __decorate([
        core_2.HostListener("click", ["$event"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ClickStopPropagation.prototype, "onClick", null);
    ClickStopPropagation = __decorate([
        core_2.Directive({
            selector: "[click-stop-propagation]"
        })
    ], ClickStopPropagation);
    return ClickStopPropagation;
}());
exports.ClickStopPropagation = ClickStopPropagation;
//# sourceMappingURL=navbar.component.js.map