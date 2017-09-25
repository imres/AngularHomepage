using System;
using System.Collections.Generic;
using UserManager.Core.Interfaces;
using UserManager.Core.Mappers;
using UserManager.DTO;

namespace UserManager.Core.Repositories
{
    public class InvitationRepository : InvitationMapper, IInvitation
    {
        /// <summary>
        /// Add new invitation
        /// </summary>
        /// <param name="invitationDTO"></param>
        public void AddInvitation(InvitationDTO invitationDTO)
        {
            using (masterEntities context = new masterEntities())
            {
                var entity = DtoToEntityMapping(invitationDTO);

                context.Invitation.Add(entity);
                context.SaveChanges();
            };
        }

        /// <summary>
        /// Get invitation by id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public InvitationDTO GetInvitation(int Id)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Get all invitations
        /// </summary>
        /// <returns></returns>
        public IEnumerable<InvitationDTO> GetInvitations()
        {
            throw new NotImplementedException();
        }
    }
}