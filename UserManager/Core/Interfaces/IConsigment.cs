using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.DTO;
using UserManager.Models;

namespace UserManager.Core.Interfaces
{
    public interface IConsigment
    {
        ConsignmentDTO AddConsignment(InvitationExtended invitation);

        void DeleteConsignment(int ConsignmentId);

        ConsignmentDTO GetConsignment(int ConsignmentId);

        IEnumerable<ConsignmentDTO> GetConsignments(string PersonId);

        IEnumerable<ConsignmentDTO> GetArchivedConsignments(string PersonId);
    }
}