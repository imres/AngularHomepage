"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var toastr_service_1 = require("./toastr.service");
var BaseService = /** @class */ (function () {
    function BaseService(injector) {
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        this.toastrService = injector.get(toastr_service_1.ToastrService);
    }
    BaseService.prototype.ToastrCreateSuccess = function (message, title) {
        if (message === void 0) { message = "Förfrågan lyckades"; }
        if (title === void 0) { title = "Skapades"; }
        // this.toastrService.ShowToastr(isConfirmed, false, "Inbjudan skickades");
        this.toastrService.Success(message, title);
    };
    BaseService.prototype.ToastrCreateError = function (message, title) {
        if (message === void 0) { message = "Kunde ej skapa"; }
        if (title === void 0) { title = "Skapades ej"; }
        this.toastrService.Error(message, title);
    };
    return BaseService;
}());
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map