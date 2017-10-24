using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.DTO;

namespace UserManager.Core.Interfaces
{
    public interface IConsigment
    {
        void AddConsignment(InvitationDTO invitationDTO);

        void DeleteConsignment(int ConsignmentId);

        ConsignmentDTO GetConsignment(int ConsignmentId);

        IEnumerable<ConsignmentDTO> GetConsignments(string PersonId);
    }
}