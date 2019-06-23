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
var index_1 = require("../../_services/index");
var AdminPanel = /** @class */ (function () {
    function AdminPanel(userService, administratorService) {
        this.userService = userService;
        this.administratorService = administratorService;
        this.modelList = ['person', 'invitation', 'consignment', "packageInformation", "payment"]; //If model is added here, it will appear on admin page
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    AdminPanel.prototype.ngOnInit = function () {
    };
    //Läs mer om hur jag lägger till checkmark efter klick http://www.angulartutorial.net/2017/04/add-class-to-active-element-angular-2.html
    AdminPanel.prototype.cleanTable = function (modelName) {
        if (window.confirm("\u00C4r du s\u00E4ker att du vill rensa tabellen " + modelName + " ?")) {
            this.administratorService.cleanTable(modelName).subscribe(function (res) {
            }, function (err) { return console.log(err); });
        }
    };
    AdminPanel = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'admin-panel.component.html',
            selector: 'admin-panel',
        }),
        __metadata("design:paramtypes", [index_1.UserService,
            index_1.AdministratorService])
    ], AdminPanel);
    return AdminPanel;
}());
exports.AdminPanel = AdminPanel;
//# sourceMappingURL=admin-panel.component.js.map