using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UserManager.DTO
{
    public class UserLinksDTO
    {
        public int Id { get; set; }
        public string Link { get; set; }
        public string CachedImage { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
    }
}