using System;
using UserManager.Core;
using UserManager.Core.Enums;
using UserManager.Core.Interfaces;

namespace UserManager.DTO
{
    public class BankIdPersonDTO : IPerson
    {

        public BankIdPersonDTO(User user)
        {
            RegisterDate = DateTime.Now;
            PersonId = user.personalNumber;
            FirstName = user.givenName;
            LastName = user.surname;
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PersonId { get; set; }
        public DateTime RegisterDate { get; set; }
        public int UserRights { get; set; } = PersonUserRights.Write;
    }
}