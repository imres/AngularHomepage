using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using UserManager.DTO;
using UserManager.Models;

namespace UserManager.Core.Interfaces
{
    public interface IConsigment : IRepository
    {
        ConsignmentDTO AddConsignment(InvitationExtended invitation);

        void DeleteConsignment(int ConsignmentId);

        ConsignmentDTO GetConsignment(int ConsignmentId);
        
        IEnumerable<ConsignmentDTO> GetArchivedConsignments(string PersonId);

        IEnumerable<ActiveConsignmentDTO> GetActiveConsignments(string PersonId);
    }
}