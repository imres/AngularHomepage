using System;
using UserManager.Core.Enums;
using UserManager.Core.Interfaces;

namespace UserManager.DTO
{
    public class PersonDTO : IPerson
    {
        public PersonDTO()
        {
            RegisterDate = DateTime.Now;
            UserRights = PersonId?.Length > 4 ? PersonUserRights.Write : PersonUserRights.Read;
        }

        public int Id { get; set; }
        public string DisplayName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PersonId { get; set; }
        public DateTime RegisterDate { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
        public int UserRights { get; set; }
        public string Token { get; set; }
        public string PhoneMobile { get; set; }
        public string Alias { get; set; }
        public int? PostalCode { get; set; }
    }
}