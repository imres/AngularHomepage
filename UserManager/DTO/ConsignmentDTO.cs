using System;

namespace UserManager.DTO
{
    public class ConsignmentDTO
    {
        public int Id { get; set; }
        public int? DepositedAmount { get; set; }
        public string PackageId { get; set; }
        public string SenderPersonId { get; set; }
        public string ReceiverPersonId { get; set; }
        public int Status { get; set; }
        public int PaymentMethod { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string DeliveryAddress { get; set; }
    }
}