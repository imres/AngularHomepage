using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.DTO;
using UserManager.Models;

namespace UserManager.Core.Interfaces
{
    public interface IInvitationRepository : IRepository<invitation>
    {

        void EndInvitation(InvitationExtended invitation);

        InvitationDTO GetInvitation(int Id);

        IEnumerable<InvitationDTO> GetInvitations(string personId);

        IEnumerable<InvitationDTO> GetUnrespondedInvitations(string personId);
        

    }
}