using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.DTO;
using UserManager.Models;

namespace UserManager.Core.Interfaces
{
    public interface IAdministratorRepository
    {
        void CleanTable(string TableName);
    }
}