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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
require("rxjs/add/operator/map");
var ConsignmentService = /** @class */ (function () {
    function ConsignmentService(http) {
        this.http = http;
        this.consignmentListSource = new BehaviorSubject_1.BehaviorSubject(null);
        this.consignmentList = this.consignmentListSource.asObservable();
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
    }
    ConsignmentService.prototype.updateConsignments = function (consignments) {
        this.consignmentListSource.next(consignments);
    };
    ConsignmentService.prototype.acceptInvite = function (invitation) {
        return this.http.post('http://localhost:65192/api/Consignment/AddConsignment', JSON.stringify(invitation), { headers: this.headers })
            .map(function (response) {
            return response.json();
        });
    };
    ConsignmentService.prototype.getConsignments = function (personId) {
        return this.http.get('http://localhost:65192/api/Consignment/GetConsignments/' + personId)
            .map(function (response) {
            return response.json();
        });
    };
    ConsignmentService.prototype.getAllConsignments = function () {
        return this.http.get('http://localhost:65192/api/Consignment/GetAllConsignments/')
            .map(function (response) {
            return response.json();
        });
    };
    ConsignmentService.prototype.getArchivedConsignments = function (personId) {
        return this.http.get('http://localhost:65192/api/Consignment/GetArchivedConsignments/' + personId)
            .map(function (response) {
            return response.json();
        });
    };
    ConsignmentService.prototype.getFinishedConsignments = function (personId) {
        return this.http.get('http://localhost:65192/api/Consignment/GetFinishedConsignments/' + personId)
            .map(function (response) {
            return response.json();
        });
    };
    ConsignmentService.prototype.archiveConsignment = function (packageId) {
        console.log("archive service call: ", packageId);
        return this.http.get('http://localhost:65192/api/Consignment/ArchiveConsignment/' + packageId)
            .map(function (response) {
            response.json();
        });
    };
    ConsignmentService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], ConsignmentService);
    return ConsignmentService;
}());
exports.ConsignmentService = ConsignmentService;
//# sourceMappingURL=consignment.service.js.map