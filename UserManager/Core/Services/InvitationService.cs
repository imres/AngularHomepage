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
    public class InvitationService : IInvitationService
    {
        private IInvitation _invitationRepository;
        private IConsigment _consignmentRepository;

        public InvitationService()
            : this(new InvitationRepository(), new ConsignmentRepository())
        {
        }

        public InvitationService(IInvitation invitationRepository, IConsigment consignmentRepository)
        {
            _invitationRepository = invitationRepository;
            _consignmentRepository = consignmentRepository;
        }

        public bool AcceptInvitation(InvitationDTO invitation)
        {
            try
            {
                _invitationRepository.AcceptInvitation(invitation);
            }
            catch
            {
                return false;
            }

            return true;
        }

        public bool AddInvitation(InvitationDTO invitation)
        {
            if (!ValidateInvitation(invitation))
                return false;

            try
            {
                _invitationRepository.AddInvitation(invitation);
            }
            catch
            {
                return false;
            }

            return true;
        }

        public bool DeclineInvitation(int Id)
        {
            try
            {
                _invitationRepository.EndInvitation(Id);
            }
            catch
            {
                return false;
            }

            return true;
        }

        public ActiveConsignmentDTO SavePackageId(InvitationExtended invitation)
        {
            ActiveConsignmentDTO activeConsignment; 

            try
            {
                _invitationRepository.EndInvitation(invitation);

                var consignment = _consignmentRepository.AddConsignment(invitation);

                //Find and return active consignment containing package API data
                activeConsignment = _consignmentRepository.ListByQuery<ActiveConsignment, ActiveConsignmentDTO>(x => x.Id == consignment.Id).FirstOrDefault();
            }
            catch (ArgumentException ex)
            {
                return null;
            }
            
            return activeConsignment;
        }

        public bool ValidateInvitation(InvitationDTO invitationToValidate)
        {
            if (invitationToValidate.ReceiverPersonId == invitationToValidate.SenderPersonId)
                return false;

            return true;
        }
    }
}