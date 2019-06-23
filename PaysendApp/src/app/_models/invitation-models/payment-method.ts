export class PaymentMethod {
    methods: { value: number, text: string }[] = [
        { "value": 0, "text": "Välj utbetalning" },
        { "value": 1, "text": "Swish" },
        { "value": 2, "text": "Bankkort" },
        { "value": 3, "text": "Paypal" }
    ];
}