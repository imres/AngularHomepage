//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace UserManager
{
    using System;
    using System.Collections.Generic;
    
    public partial class Consignment
    {
        public int Id { get; set; }
        public Nullable<int> DepositedAmount { get; set; }
        public string PackageId { get; set; }
        public string ConsignmentId { get; set; }
        public int SenderPersonId { get; set; }
        public int ReceiverPersonId { get; set; }
        public int Status { get; set; }
        public int RequestedDepositAmount { get; set; }
        public int PaymentMethod { get; set; }
    }
}
