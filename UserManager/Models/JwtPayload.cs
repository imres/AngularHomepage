﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UserManager.Models
{
    public class JwtPayload
    {
        public int UserRights { get; set; }
        public string Email { get; set; }
        public string PersonId { get; set; }
    }
}