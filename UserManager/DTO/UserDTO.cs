﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UserManager.Models
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public bool admin { get; set; }

        public string token { get; set; }
    }
}