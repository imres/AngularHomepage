﻿using AutoMapper;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using UserManager.Core.Enums;
using UserManager.Core.Interfaces;
using UserManager.Core.Mappers;
using UserManager.DTO;
using UserManager.Models;

namespace UserManager.Core.Repositories
{
    public class InvitationRepository : Repository<invitation>, IInvitationRepository
    {
        public InvitationRepository(masterEntitiesMYSQL context)
            : base(context)
        {

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
            using (masterEntitiesMYSQL context = new masterEntitiesMYSQL())
            {
                //Where personId exists and is active invitation OR if invitation is status created and personid doesnt match initiator
                IEnumerable<invitation> invitations = context.invitation
                    .Where(x => (x.EndDate == null && (x.ReceiverPersonId == personId || x.SenderPersonId == personId)) &&
                    
                    ((x.Status > InvitationStatus.Created && x.Status < InvitationStatus.ConsignmentActive) ||
                    (x.Status == InvitationStatus.Created && x.InvitationInitiatorPersonId != personId))
                );

                var invitationsDTO = Mapper.Map<IEnumerable<InvitationDTO>>(invitations);

                return invitationsDTO;
            }
        }

        public IEnumerable<InvitationDTO> GetUnrespondedInvitations(string personId)
        {
            using (masterEntitiesMYSQL context = new masterEntitiesMYSQL())
            {
                IEnumerable<invitation> unrespondedInvitations = context.invitation.Where(x => x.EndDate == null &&
                (x.ReceiverPersonId == personId || x.SenderPersonId == personId));

                var unrespondedInvitationsDTO = Mapper.Map<IEnumerable<InvitationDTO>>(unrespondedInvitations);

                return unrespondedInvitationsDTO;
            }
        }

        /// <summary>
        /// Set invitation status to ConsignmentActive
        /// </summary>
        public void EndInvitation(InvitationExtended invitation)
        {
            using (var context = new masterEntitiesMYSQL())
            {
                var invitationToEnd = context.invitation.Where(x => x.Id == invitation.Id).First();

                invitationToEnd.Status = InvitationStatus.ConsignmentActive;
                invitationToEnd.EndDate = DateTime.Now;

                context.SaveChanges();
            }
        }
    }
}