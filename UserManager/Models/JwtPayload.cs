using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UserManager.Models
{
    public class JwtPayload
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public int PersonId { get; set; }
    }
}