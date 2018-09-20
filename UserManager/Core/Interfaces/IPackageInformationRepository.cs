using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.DTO;
using UserManager.Models;

namespace UserManager.Core.Interfaces
{
    public interface IPackageInformationRepository
    {
        /// <summary>
        /// If package information does not exist on consignment id, create new row. Otherwise update existing row with new content 
        /// </summary>
        /// <returns>Updated/Created PackageInformation row</returns>
        PackageInformation UpdatePackageInformation(ConsignmentDTO consignment);
    }
}