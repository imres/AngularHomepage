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
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
require("rxjs/add/operator/map");
var ToastrService = /** @class */ (function () {
    function ToastrService(toastr) {
        this.toastr = toastr;
        this.toastrOptions = {
            showCloseButton: true
        };
    }
    /**
        Show notification message on website
     * @method ShowToastr
        Indicates success or error status
     * @param isConfirmed
        Should error message be available?
     * @param errorMessageEnabled
        Message to display on success
     * @param successMessage
        Message to display on error (if enabled)
     * @param errorMessage
     */ //ShowToastr documentation
    ToastrService.prototype.ShowToastr = function (isConfirmed, errorMessageEnabled, closeButtonEnabled, successMessage, errorMessage) {
        if (errorMessageEnabled === void 0) { errorMessageEnabled = true; }
        if (closeButtonEnabled === void 0) { closeButtonEnabled = false; }
        if (successMessage === void 0) { successMessage = "Lyckades"; }
        if (errorMessage === void 0) { errorMessage = "Kunde inte genomföra frågan"; }
        if (isConfirmed) {
            this.toastr.success(successMessage, "", {
                showCloseButton: closeButtonEnabled
            });
        }
        else if (!isConfirmed && errorMessageEnabled) {
            this.toastr.error(errorMessage);
        }
    };
    ToastrService.prototype.Success = function (message, title) {
        // this.toastrService.ShowToastr(isConfirmed, false, "Inbjudan skickades");
        this.toastr.success(message, title, this.toastrOptions);
    };
    ToastrService.prototype.Error = function (message, title) {
        this.toastr.error(message, title, this.toastrOptions);
    };
    ToastrService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager])
    ], ToastrService);
    return ToastrService;
}());
exports.ToastrService = ToastrService;
//# sourceMappingURL=toastr.service.js.map