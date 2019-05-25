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
        private UnitOfWork unitOfWork = new UnitOfWork(new masterEntitiesMYSQL());

        public bool SavePackageInformation(ConsignmentDTO consignment)
        {
            try
            {
                using(var context = new masterEntitiesMYSQL())
                {
                    var packageInformation = unitOfWork.PackageInformation.UpdatePackageInformation(consignment);
                    context.packageinformation.Add(packageInformation);
                    context.SaveChanges();
                }
            }
            catch
            {
                return false;
            }

            return true;
        }
    }
}