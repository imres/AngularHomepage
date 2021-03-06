﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.DTO;

namespace UserManager.Core.Interfaces
{
    public interface IBankIdService
    {
        string AuthenticatePersonId(string personId);
        BankIdCollectDto CollectRequest(BankIdCollectDto bankIdAuthResponse);
    }
}