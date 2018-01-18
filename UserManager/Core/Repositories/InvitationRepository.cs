using System;
using System.Collections.Generic;
using System.Linq;
using UserManager.Core.Enums;
using UserManager.Core.Interfaces;
using UserManager.Core.Mappers;
using UserManager.DTO;

namespace UserManager.Core.Repositories
{
    public class InvitationRepository : Mapper, IInvitation
    {
        
        /// <summary>
        /// Add new invitation
        /// </summary>
        /// <param name="invitationDTO"></param>
        public void AddInvitation(InvitationDTO invitationDTO)
        {
            using (masterEntities context = new masterEntities())
            {
                var maxId = GetMaxInteger<Invitation>(x => x.Id);

                invitationDTO.Id = maxId;
                invitationDTO.Status = InvitationStatus.Created;
                invitationDTO.StartDate = DateTime.Now;

                var entity = DtoToEntityMapping<InvitationDTO, Invitation>(invitationDTO);

                context.Invitation.Add(entity);
                context.SaveChanges();
            };
        }

        /// <summary>
        /// Accept received invitation and set status
        /// </summary>
        /// <param name="Id">Invitation Id</param>
        public void AcceptInvitation(InvitationDTO invitationDTO)
        {
            using (var context = new masterEntities())
            {
                var invitationToAccept = context.Invitation.Where(x => x.Id == invitationDTO.Id).First();

                invitationToAccept.Status = InvitationStatus.Accepted;
                invitationToAccept.RequestedDepositAmount = invitationDTO.RequestedDepositAmount;

                context.SaveChanges();
            }
        }

        public void EndInvitation(int Id)
        {
            using (var context = new masterEntities())
            {

                var invitationToEdit = context.Invitation.Where(x => x.Id == Id).First();

                invitationToEdit.EndDate = DateTime.Now;

                context.SaveChanges();
            }
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
        public IEnumerable<InvitationDTO> GetInvitations(string personId)
        {
            using (masterEntities context = new masterEntities())
            {
                //Where personId exists and is active invitation OR if invitation is status created and personid doesnt match initiator
                IEnumerable<Invitation> invitations = context.Invitation
                    .Where(x => (x.EndDate == null && (x.ReceiverPersonId == personId || x.SenderPersonId == personId)) &&
                    
                    ((x.Status > InvitationStatus.Created && x.Status < InvitationStatus.ConsignmentActive) ||
                    (x.Status == InvitationStatus.Created && x.InvitationInitiatorPersonId != personId))
                );

                var invitationsDTO = EntityToDtoMappingCollection<Invitation, InvitationDTO>(invitations);

                return invitationsDTO;
            }
        }

        public IEnumerable<InvitationDTO> GetUnrespondedInvitations(string personId)
        {
            using (masterEntities context = new masterEntities())
            {
                IEnumerable<Invitation> unrespondedInvitations = context.Invitation.Where(x => x.EndDate == null &&
                (x.ReceiverPersonId == personId || x.SenderPersonId == personId));

                var unrespondedInvitationsDTO = EntityToDtoMappingCollection<Invitation, InvitationDTO>(unrespondedInvitations);

                return unrespondedInvitationsDTO;
            }
        }
    }
}