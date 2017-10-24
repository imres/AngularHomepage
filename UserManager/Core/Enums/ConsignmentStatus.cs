using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UserManager.Core.Enums
{
    public static class ConsignmentStatus
    {
        public const int InvitationCreated = 1;
        public const int ConsignmentCreated = 2;
        public const int AmountDeposited = 3;
        public const int ConsignmentActive = 4;
        public const int ConsignmentCompleted = 5;
    }
}