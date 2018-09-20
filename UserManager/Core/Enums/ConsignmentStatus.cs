using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UserManager.Core.Enums
{
    public static class ConsignmentStatus
    {
        public const int Active = 1;
        public const int Finished = 9;
        public const int Archived = 10;
        public const int Delay = 202;
        public const int Error = 404;
    }

}