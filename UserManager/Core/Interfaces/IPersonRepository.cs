using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.DTO;

namespace UserManager.Core.Interfaces
{
    public interface IPersonRepository
    {
        Person AddPerson(IPerson personDTO);

        PersonDTO Authenticate(PersonDTO personDTO);

        PersonDTO AuthenticateBankId(BankIdCollectDto bankIdCollectDTO);
    }
}