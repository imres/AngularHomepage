using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UserManager.Models
{
    public class JwtHeader
    {
        public string type { get; set; }
        public string algorithm { get; set; }
    }
}