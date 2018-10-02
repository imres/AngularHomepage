using System.Collections.Generic;
using UserManager.DTO;
using UserManager.Models;

namespace UserManager.Core.Interfaces
{
    public interface IConsignmentService
    {
        IEnumerable<ActiveConsignmentDTO> GetActiveConsignments(string PersonId);
        IEnumerable<ActiveConsignmentDTO> GetAllConsignments();
        ConsignmentDTO AddConsignment(InvitationExtended invitation);
        Consignment CreateConsignmentFromInvitation(InvitationExtended invitation);
    }
}