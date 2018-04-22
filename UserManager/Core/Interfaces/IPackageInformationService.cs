using UserManager.DTO;

namespace UserManager.Core.Interfaces
{
    public interface IPackageInformationService
    {
        bool SavePackageInformation(ConsignmentDTO consignment);
    }
}