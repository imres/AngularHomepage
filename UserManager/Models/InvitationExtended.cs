using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.DTO;

namespace UserManager.Models
{
    public class InvitationExtended : InvitationDTO
    {
        public string PackageId { get; set; }
    }
}