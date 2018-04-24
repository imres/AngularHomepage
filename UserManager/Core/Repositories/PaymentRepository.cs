using System;
using System.Collections.Generic;
using System.Linq;
using UserManager.Core.Enums;
using UserManager.Core.Interfaces;
using UserManager.Core.Mappers;
using UserManager.DTO;

namespace UserManager.Core.Repositories
{
    public class PaymentRepository : CustomMapper, IPayment
    {
        public void MockProcessPayment(InvitationDTO invitation)
        {
            using (var context = new masterEntities())
            {
                var invitationToAccept = context.Invitation.Where(x => x.Id == invitation.Id).First();
                invitationToAccept.Status = InvitationStatus.AmountDeposited;

                var payment = BuildPaymentObject(invitation);

                context.Payment.Add(payment);
                context.SaveChanges();
            }
        }

        private Payment BuildPaymentObject(InvitationDTO invitation)
        {
            var payment = new Payment()
            {
                Id = GetMaxInteger<Payment>(x => x.Id),
                PaymentDate = DateTime.Now,
                PaymentSenderPersonId = invitation.ReceiverPersonId,
                PaymentReceiverPersonId = invitation.SenderPersonId,
                InvitationId = invitation.Id,
                DepositAmount = invitation.RequestedDepositAmount.Value,
                PaymentMethod = invitation.PaymentMethod.Value
            };

            return payment;
        }
    }
}