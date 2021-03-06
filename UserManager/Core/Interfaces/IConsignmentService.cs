﻿using System.Collections.Generic;
using UserManager.DTO;
using UserManager.Models;

namespace UserManager.Core.Interfaces
{
    public interface IConsignmentService
    {
        IEnumerable<ActiveConsignmentDTO> GetActiveConsignments(string PersonId);
        IEnumerable<ActiveConsignmentDTO> GetAllConsignments();
        ConsignmentDTO ArchiveConsignment(string PackageId);
        ConsignmentDTO AddConsignment(InvitationExtended invitation);
        consignment CreateConsignmentFromInvitation(InvitationExtended invitation);
        void UpdateConsignmentStatus(ConsignmentDTO consignmentDTO);
    }
}