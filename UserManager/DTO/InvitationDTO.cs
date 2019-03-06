using System;

namespace UserManager.DTO
{
    public class InvitationDTO
    {
        public InvitationDTO()
        {
            PaymentMethod = 0;
        }

        public int Id { get; set; }
        public string SenderPersonId { get; set; }
        public string ReceiverPersonId { get; set; }
        public int Status { get; set; }
        public int? PaymentMethod { get; set; }
        public int? RequestedDepositAmount { get; set; }
        public string InvitationInitiatorPersonId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CustomDeliveryAddress { get; set; }
    }
}