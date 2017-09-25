using System;

namespace UserManager.DTO
{
    public class InvitationDTO
    {
        public int Id { get; set; }
        public int SenderPersonId { get; set; }
        public int ReceiverPersonId { get; set; }
        public int Status { get; set; }
        public int? PaymentMethod { get; set; }
        public int? RequestedDepositAmount { get; set; }

    }
}