using System;

namespace UserManager.DTO
{
    public class PersonDTO
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int PersonId { get; set; }
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