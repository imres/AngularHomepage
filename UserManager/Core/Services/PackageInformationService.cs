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
    public class PackageInformationService : IPackageInformationService
    {
        private IPackageInformation _packageInformationRepository;

        public PackageInformationService()
            : this(new PackageInformationRepository())
        {
        }

        public PackageInformationService(IPackageInformation packageInformationRepository)
        {
            _packageInformationRepository = packageInformationRepository;
        }

        public bool SavePackageInformation(ConsignmentDTO consignment)
        {
            try
            {
                _packageInformationRepository.UpdatePackageInformation(consignment);
            }
            catch
            {
                return false;
            }

            return true;
        }
    }
}