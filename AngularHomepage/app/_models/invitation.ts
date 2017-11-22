export class Invitation {
    public Id: number;
    public SenderPersonId: string;
    public ReceiverPersonId: string;
    public Status: number;
    public PaymentMethod: number;
    public RequestedDepositAmount: number;
    public InvitationInitiatorPersonId: string;
    public StartDate: Date;
    public EndDate: Date;
}