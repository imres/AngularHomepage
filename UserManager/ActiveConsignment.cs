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
    
    public partial class activeconsignment
    {
        public int Id { get; set; }
        public Nullable<int> DepositedAmount { get; set; }
        public string PackageId { get; set; }
        public string SenderPersonId { get; set; }
        public string ReceiverPersonId { get; set; }
        public int Status { get; set; }
        public int PaymentMethod { get; set; }
        public System.DateTime StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string DeliveryAddress { get; set; }
        public int DeliveryPostalCode { get; set; }
        public string DeliveryCity { get; set; }
        public string ReceiverPhoneNumber { get; set; }
        public string Content { get; set; }
    }
}
