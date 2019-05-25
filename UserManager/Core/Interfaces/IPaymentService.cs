using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.Core.Interfaces;
using UserManager.Core.Repositories;
using UserManager.DTO;

namespace UserManager.Core.Interfaces
{
    public interface IPaymentService
    {
        payment ProcessPayment(InvitationDTO invitationDTO, string stripeEmail, string stripeToken);
        bool MockProcessPayment(InvitationDTO invitationDTO);
    }
}