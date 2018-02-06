using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.Core.Interfaces;
using UserManager.Core.Repositories;
using UserManager.DTO;
using UserManager.Models;

namespace UserManager.Core.Services
{
    public class AdministratorService : IAdministratorService
    {
        private IAdministrator _administratorRepository;

        public AdministratorService()
            : this(new AdministratorRepository())
        {
        }

        public AdministratorService(IAdministrator administratorRepository)
        {
            _administratorRepository = administratorRepository;
        }

        public bool CleanTable(string TableName)
        {
            try
            {
                _administratorRepository.CleanTable(TableName);
            }
            catch
            {
                return false;
            }

            return true;
        }
    }
}