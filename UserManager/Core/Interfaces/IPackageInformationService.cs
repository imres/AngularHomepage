using UserManager.DTO;

namespace UserManager.Core.Interfaces
{
    public interface IPackageInformationService
    {
        string GetLatestPostNordEventCode(ConsignmentDTO consignmentDTO);
        bool SavePackageInformation(ConsignmentDTO consignment);
        packageinformation UpdatePackageInformation(ConsignmentDTO consignment, bool isFirstTimeUpdate = false);
    }
}