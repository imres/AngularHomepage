"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PaymentMethod = /** @class */ (function () {
    function PaymentMethod() {
        this.methods = [
            { "value": 0, "text": "Välj utbetalning" },
            { "value": 1, "text": "Swish" },
            { "value": 2, "text": "Bankkort" },
            { "value": 3, "text": "Paypal" }
        ];
    }
    return PaymentMethod;
}());
exports.PaymentMethod = PaymentMethod;
//# sourceMappingURL=payment-method.js.map