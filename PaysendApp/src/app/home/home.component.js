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
var index_2 = require("../_models/enums/index");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(userService, invitationService, consignmentService) {
        this.userService = userService;
        this.invitationService = invitationService;
        this.consignmentService = consignmentService;
        this.showDialog = false;
        this.invitationStatus = index_2.InvitationStatusEnum;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.isClassActive = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getInvitations();
        this.getFinishedConsignments();
        this.invitationService.invitationList.subscribe(function (invitations) {
            _this.invitations = invitations;
            _this.updateFilteredInvitations();
        });
    };
    HomeComponent.prototype.updateFilteredInvitations = function () {
        if (this.invitations == null)
            return;
        this.invitationNotifications = this.invitations.filter(function (x) { return x.Status == index_2.InvitationStatusEnum.Created; });
    };
    HomeComponent.prototype.getInvitations = function () {
        var _this = this;
        this.invitationService.getInvitations(this.currentUser.PersonId).subscribe(function (invitations) {
            console.log("Hämtade invites från API");
            if (invitations == null)
                return;
            _this.invitations = invitations;
            //this.updateFilteredInvitations();
            _this.invitationService.updateInvitations(invitations);
        }, function (err) { console.log("Error: {0}", err); });
    };
    HomeComponent.prototype.getFinishedConsignments = function () {
        var _this = this;
        this.consignmentService.getFinishedConsignments(this.currentUser.PersonId).subscribe(function (res) {
            _this.finishedConsignments = res;
            console.log(res);
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'home.component.html'
        }),
        __metadata("design:paramtypes", [index_1.UserService,
            index_1.InvitationService,
            index_1.ConsignmentService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map