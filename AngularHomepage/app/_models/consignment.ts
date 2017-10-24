export class Consignment {
    public Id: number;
    public PackageId: string;
    public ConsignmentId: number;
    public SenderPersonId: string;
    public ReceiverPersonId: string;
    public Status: number;
    public RequestedDepositAmount: number;
    public PaymentMethod: number;
}