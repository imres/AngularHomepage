"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
require("rxjs/add/operator/map");
var base_service_1 = require("./base.service");
var http_status_code_enum_1 = require("../_models/enums/http-status-code.enum");
var InvitationService = /** @class */ (function (_super) {
    __extends(InvitationService, _super);
    function InvitationService(injector, http) {
        var _this = _super.call(this, injector) || this;
        _this.http = http;
        _this.currentInviteSource = new BehaviorSubject_1.BehaviorSubject(null);
        _this.invitationListSource = new BehaviorSubject_1.BehaviorSubject(null);
        _this.invitationList = _this.invitationListSource.asObservable();
        _this.currentInvite = _this.currentInviteSource.asObservable();
        _this.headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return _this;
    }
    //Update active invitation used in dialog
    InvitationService.prototype.changeInviteData = function (invite) {
        this.currentInviteSource.next(invite);
    };
    //Update invitation list with fresh data
    InvitationService.prototype.updateInvitations = function (invitations) {
        this.invitationListSource.next(invitations);
    };
    InvitationService.prototype.sendInvite = function (invitation) {
        return this.http.post('http://localhost:65192/api/Invitation/Invite', JSON.stringify(invitation), { headers: this.headers })
            .map(function (response) {
            return response.json();
        }).catch(function (error) {
            return Observable_1.Observable.throw(false);
        });
    };
    InvitationService.prototype.acceptInvite = function (invitation) {
        return this.http.post('http://localhost:65192/api/Invitation/AcceptInvitation', JSON.stringify(invitation), { headers: this.headers })
            .map(function (response) {
            return response.json();
        }).catch(function (error) {
            return Observable_1.Observable.throw(false);
        });
    };
    InvitationService.prototype.savePackageId = function (invitation) {
        var _this = this;
        return this.http.post('http://localhost:65192/api/Invitation/SavePackageId', JSON.stringify(invitation), { headers: this.headers })
            .map(function (response) {
            _this.ToastrCreateSuccess("Försändelse skapad");
            return response.json();
        }).catch(function (error) {
            if (error.status === http_status_code_enum_1.HttpStatusCode.BAD_REQUEST) {
                _this.ToastrCreateError(JSON.parse(error.text()));
            }
            return Observable_1.Observable.throw(false);
        });
    };
    InvitationService.prototype.endInvite = function (id) {
        return this.http.get('http://localhost:65192/api/Invitation/EndInvitation/' + id)
            .map(function (response) {
            return response.text();
        }).catch(function (error) {
            return Observable_1.Observable.throw(false);
        });
    };
    InvitationService.prototype.getInvitations = function (personId) {
        return this.http.get('http://localhost:65192/api/Invitation/GetInvitations/' + personId)
            .map(function (response) {
            return response.json();
        }).catch(function (error) {
            return Observable_1.Observable.throw(false);
        });
    };
    InvitationService.prototype.getUnrespondedInvitations = function (personId) {
        return this.http.get('http://localhost:65192/api/Invitation/GetUnrespondedInvitations/' + personId)
            .map(function (response) {
            return response.json();
        }).catch(function (error) {
            return Observable_1.Observable.throw(false);
        });
    };
    InvitationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.Injector,
            http_1.Http])
    ], InvitationService);
    return InvitationService;
}(base_service_1.BaseService));
exports.InvitationService = InvitationService;
//# sourceMappingURL=invitation.service.js.map