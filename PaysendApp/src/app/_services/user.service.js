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
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        this.postheader = new http_1.Headers({
            'Content-Type': 'application/json;charset=UTF-8'
        });
    }
    //getPackage() {
    //    return this.http.get('http://localhost:65192/api/PackageInformation/PostGet/2')
    //        .map((response: Response) =>
    //            response.json()
    //        );
    //}
    //getPackage(consignment: Person) {
    //    console.log(user);
    //    return this.http.post('http://localhost:65192/api/PackageInformation/PostGet',
    //        JSON.stringify(user),
    //        { headers: this.headers })
    //        .map((response: Response) =>
    //            response.json()
    //        );
    //}
    //https://api.aftership.com/v4/trackings/:slug/:RR747540648SE
    /*getAll(id: number) {
        return this.http.get('http://localhost:65192/api/User/GetById/'+id)
            .map((response: Response) => response.json());
    }*/
    UserService.prototype.getById = function (id) {
        return this.http.get('/api/users/' + id, this.jwt())
            .map(function (response) {
            return response.json();
        });
    };
    UserService.prototype.getAllUsers = function () {
        return this.http.get('http://localhost:65192/api/User/GetAllUsers')
            .map(function (response) {
            return response.json();
        });
    };
    UserService.prototype.create = function (user) {
        console.log(user);
        return this.http.post('http://localhost:65192/api/User/Register', JSON.stringify(user), { headers: this.headers })
            .map(function (response) {
            return response.json();
        });
    };
    UserService.prototype.update = function (user) {
        console.log(user);
        return this.http.post('http://localhost:65192/api/User/Update', JSON.stringify(user), { headers: this.headers })
            .map(function (response) {
            var user = response.json();
            if (user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                return response.json();
            }
        });
    };
    //update(user: User) {
    //    return this.http.put('/api/users/' + user.Id, user, this.jwt()).map((response: Response) => response.json());
    //}
    UserService.prototype.delete = function (id) {
        return this.http.delete('/api/users/' + id, this.jwt()).map(function (response) { return response.json(); });
    };
    // private helper methods
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map