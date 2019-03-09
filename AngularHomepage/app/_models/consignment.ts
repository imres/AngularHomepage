export class Consignment {
    public Id: number;
    public PackageId: string;
    public ConsignmentId: number;
    public SenderPersonId: string;
    public ReceiverPersonId: string;
    public Status: number;
    public PaymentMethod: number;
    public StartDate: Date;
    public EndDate: Date;
    public Title: string;
    public Description: string;
    public DeliveryAddress: string;
    
    public Content: string = '';
}