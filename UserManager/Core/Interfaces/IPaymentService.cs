﻿using System;
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
        Payment ProcessPayment(InvitationDTO invitationDTO);
        bool MockProcessPayment(InvitationDTO invitationDTO);
    }
}