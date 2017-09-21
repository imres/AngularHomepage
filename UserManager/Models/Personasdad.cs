using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UserManager.Models
{
    public class Personasdad
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int? PersonId { get; set; }
        public DateTime RegisterDate { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
        public int UserRights { get; set; }
    }
}