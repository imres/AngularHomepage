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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
var index_1 = require("../_models/enums/index");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
    }
    AuthenticationService.prototype.bankIdAuth = function (personId) {
        return this.http.get('http://localhost:65192/api/BankId/BankIdAuth/' + personId)
            .map(function (response) {
            return response.json();
        }).catch(function (err) {
            return Observable_1.Observable.throw("Could not authenticate");
        });
    };
    AuthenticationService.prototype.bankIdCollect = function (bankIdAuthResponse) {
        return this.http.post('http://localhost:65192/api/BankId/BankIdCollect', bankIdAuthResponse, { headers: this.headers })
            .map(function (response) {
            var user = response.json();
            if (user && user.Token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        }).catch(function (err) {
            if (err.status == index_1.HttpStatusCode.PRECONDITION_FAILED)
                return Observable_1.Observable.throw("BankID anrop misslyckades");
            if (err.status == index_1.HttpStatusCode.BAD_REQUEST)
                return Observable_1.Observable.throw("Det gick inte att logga in. Påloggningen är redan påbörjad. Öppna BankID säkerhetsapp och vänta tills du ser 'Klar att användas'. Vänligen försök sedan logga in igen.");
            return Observable_1.Observable.throw("Could not send request");
        });
    };
    AuthenticationService.prototype.login = function (email, password) {
        return this.http.post('http://localhost:65192/api/User/Auth', JSON.stringify({ Email: email, Password: password }), { headers: this.headers })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var user = response.json();
            if (user && user.Token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        }).catch(function (err) {
            if (err.status == index_1.HttpStatusCode.FORBIDDEN)
                return Observable_1.Observable.throw("Invalid login credentials");
            return Observable_1.Observable.throw("Could not send request");
        });
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    };
    AuthenticationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map