using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.DTO;

namespace UserManager.Core.Interfaces
{
    public interface IPerson
    {
        void AddPerson(PersonDTO personDTO);

        PersonDTO Authenticate(PersonDTO personDTO);
    }
}