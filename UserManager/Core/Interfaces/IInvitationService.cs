using UserManager.DTO;
using UserManager.Models;

namespace UserManager.Core.Interfaces
{
    public interface IInvitationService
    {
        bool AddInvitation(InvitationDTO invitation);
        bool AcceptInvitation(InvitationDTO invitation);
        bool DeclineInvitation(int Id);
        bool ValidateInvitation(InvitationDTO invitationToValidate);
        ActiveConsignmentDTO SavePackageId(InvitationExtended invitation);
    }
}