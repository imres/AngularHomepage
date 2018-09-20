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
        private UnitOfWork unitOfWork = new UnitOfWork(new masterEntities());

        public bool SavePackageInformation(ConsignmentDTO consignment)
        {
            try
            {
                using(var context = new masterEntities())
                {
                    var packageInformation = unitOfWork.PackageInformation.UpdatePackageInformation(consignment);
                    context.PackageInformation.Add(packageInformation);
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