using System;
using System.Collections.Generic;
using System.Linq;
using UserManager.Core.Enums;
using UserManager.Core.Interfaces;
using UserManager.Core.Mappers;
using UserManager.DTO;

namespace UserManager.Core.Repositories
{
    public class PaymentRepository : Repository<payment>, IPayment
    {
        public PaymentRepository(masterEntitiesMYSQL context) : base(context)
        {

        }

        public void MockProcessPayment(InvitationDTO invitation)
        {
            
        }

        
    }
}