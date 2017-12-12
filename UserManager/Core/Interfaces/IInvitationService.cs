using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.DTO;

namespace UserManager.Core.Interfaces
{
    public interface IInvitationService
    {
        bool AddInvitation(InvitationDTO invitation);
        bool ValidateInvitation(InvitationDTO invitationToValidate);
    }
}