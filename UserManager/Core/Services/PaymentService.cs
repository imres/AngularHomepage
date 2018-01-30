using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.Core.Interfaces;
using UserManager.Core.Repositories;
using UserManager.DTO;

namespace UserManager.Core.Services
{
    public class PaymentService : IPaymentService
    {
        private IPayment _paymentRepository;

        public PaymentService()
            : this(new PaymentRepository())
        {
        }

        public PaymentService(IPayment paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }

        public bool MockProcessPayment(InvitationDTO invitationDTO)
        {
            try
            {
                _paymentRepository.MockProcessPayment(invitationDTO);
            }
            catch
            {
                return false;
            }

            return true;
        }
    }
}