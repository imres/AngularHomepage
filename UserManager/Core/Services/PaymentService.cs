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