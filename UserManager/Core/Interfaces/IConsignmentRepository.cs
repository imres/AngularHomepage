﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using UserManager.DTO;
using UserManager.Models;

namespace UserManager.Core.Interfaces
{
    public interface IConsignmentRepository : IRepository<Consignment>
    {
        
        IEnumerable<ActiveConsignmentDTO> GetArchivedConsignments(string PersonId);

        IEnumerable<ActiveConsignmentDTO> GetFinishedConsignments(string PersonId);
    }
}