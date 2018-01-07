﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.DTO;

namespace UserManager.Core.Interfaces
{
    public interface IInvitation
    {
        void AddInvitation(InvitationDTO invitationDTO);

        void AcceptInvitation(InvitationDTO invitationDTO);

        InvitationDTO GetInvitation(int Id);

        IEnumerable<InvitationDTO> GetInvitations(string personId);

        IEnumerable<InvitationDTO> GetUnrespondedInvitations(string personId);

        void EndInvitation(int Id);
        

    }
}