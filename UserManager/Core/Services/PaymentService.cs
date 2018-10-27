using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.Core.Enums;
using UserManager.Core.Interfaces;
using UserManager.Core.Repositories;
using UserManager.DTO;

namespace UserManager.Core.Services
{
    public class PaymentService : IPaymentService
    {
        private UnitOfWork unitOfWork = new UnitOfWork(new masterEntities());

        public Payment ProcessPayment(InvitationDTO invitationDTO)
        {
            var invitationToAccept = unitOfWork.Invitation.Get(invitationDTO.Id);
            invitationToAccept.Status = InvitationStatus.AmountDeposited;

            StripeConfiguration.SetApiKey("sk_test_epJ2E8spaOeuMhz9mdRabvi9");

            var options = new ChargeCreateOptions
            {
                Amount = invitationDTO.RequestedDepositAmount.Value * 10,
                Currency = "sek",
                SourceId = "tok_visa",
                ReceiptEmail = "pontuswikberg_@hotmail.com",
            };
            var service = new ChargeService();
            Charge charge = service.Create(options);

            var payment = new Payment()
            {
                PaymentDate = DateTime.Now,
                PaymentSenderPersonId = invitationDTO.ReceiverPersonId,
                PaymentReceiverPersonId = invitationDTO.SenderPersonId,
                InvitationId = invitationDTO.Id,
                DepositAmount = (int)charge.Amount,
                PaymentMethod = invitationDTO.PaymentMethod.Value
            };

            unitOfWork.Payment.Add(payment);
            unitOfWork.Save();

            return payment;
        }

        public bool MockProcessPayment(InvitationDTO invitationDTO)
        {
            try
            {
                //unitOfWork.Payment.MockProcessPayment(invitationDTO);
                var invitationToAccept = unitOfWork.Invitation.Get(invitationDTO.Id);
                invitationToAccept.Status = InvitationStatus.AmountDeposited;

                var payment = BuildPaymentObject(invitationDTO);

                unitOfWork.Payment.Add(payment);
                unitOfWork.Save();
            }
            catch (Exception err)
            {
                return false;
            }

            return true;
        }

        private Payment BuildPaymentObject(InvitationDTO invitation)
        {
            var payment = new Payment()
            {
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