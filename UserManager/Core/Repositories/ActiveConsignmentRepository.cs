using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.Core.Interfaces;

namespace UserManager.Core.Repositories
{
    public class ActiveConsignmentRepository : Repository<activeconsignment>, IActiveConsignmentRepository
    {
        public ActiveConsignmentRepository(masterEntitiesMYSQL context) : base(context)
        {

        }
    }
}