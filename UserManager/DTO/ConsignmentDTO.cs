﻿namespace UserManager.DTO
{
    public class ConsignmentDTO
    {
        public int Id { get; set; }
        public int? DepositedAmount { get; set; }
        public string PackageId { get; set; }
        public int ConsignmentId { get; set; }
        public string SenderPersonId { get; set; }
        public string ReceiverPersonId { get; set; }
        public int Status { get; set; }
        public int RequestedDepositAmount { get; set; }
        public int PaymentMethod { get; set; }
    }
}