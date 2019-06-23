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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var FilterService = /** @class */ (function () {
    function FilterService(http) {
        this.http = http;
    }
    //Set new invitation status from object in list
    FilterService.prototype.updateInvitationStatus = function (invitationList, invitation, newStatus) {
        var updateInvitation = invitationList.filter(function (x) { return x.Id == invitation.Id; });
        var index = invitationList.indexOf(updateInvitation[0]);
        invitation.Status = newStatus;
        invitationList[index] = invitation;
    };
    FilterService.prototype.removeFromListByProperty = function (list, object, property) {
        if (property === void 0) { property = "Id"; }
        list = list.filter(function (x) {
            return x[property] != object[property];
        });
        return list;
    };
    FilterService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], FilterService);
    return FilterService;
}());
exports.FilterService = FilterService;
//# sourceMappingURL=filter.service.js.map