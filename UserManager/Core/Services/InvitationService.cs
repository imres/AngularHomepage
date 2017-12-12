using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.Core.Interfaces;
using UserManager.Core.Repositories;
using UserManager.DTO;

namespace UserManager.Core.Services
{
    public class InvitationService : IInvitationService
    {
        private IInvitation _invitationRepository;

        public InvitationService()
            : this(new InvitationRepository())
        {
        }

        public InvitationService(IInvitation invitationRepository)
        {
            _invitationRepository = invitationRepository;
        }

        public bool AddInvitation(InvitationDTO invitation)
        {
            if (!ValidateInvitation(invitation))
                return false;

            try
            {
                _invitationRepository.AddInvitation(invitation);
            }
            catch
            {
                return false;
            }

            return true;
        }

        public bool ValidateInvitation(InvitationDTO invitationToValidate)
        {
            if (invitationToValidate.ReceiverPersonId == invitationToValidate.SenderPersonId)
                return false;

            return true;
        }
    }
}