using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserManager.DTO;

namespace UserManager.Core.Interfaces
{
    public interface IUserService
    {
        PersonDTO UpdateUser(PersonDTO user);
    }
}
