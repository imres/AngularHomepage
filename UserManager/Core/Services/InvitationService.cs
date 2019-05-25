using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Web;
using UserManager.Core.Enums;
using UserManager.Core.Interfaces;
using UserManager.Core.Repositories;
using UserManager.DTO;
using UserManager.Models;

namespace UserManager.Core.Services
{
    public class InvitationService : IInvitationService
    {
        private UnitOfWork unitOfWork = new UnitOfWork(new masterEntitiesMYSQL());
        private IConsignmentService _consignmentService;

        public InvitationService() : this(new ConsignmentService())
        {

        }

        public InvitationService(IConsignmentService consignmentService)
        {
            _consignmentService = consignmentService;
        }

        public bool AcceptInvitation(InvitationDTO invitation)
        {
            try
            {
                var entity = unitOfWork.Invitation.Get(invitation.Id);

                entity.Status = InvitationStatus.Accepted;
                entity.RequestedDepositAmount = invitation.RequestedDepositAmount;
                entity.DeliveryAddress = invitation.DeliveryAddress;
                entity.DeliveryPostalCode = invitation.DeliveryPostalCode;
                entity.DeliveryCity = invitation.DeliveryCity;

                unitOfWork.Save();
            }
            catch
            {
                return false;
            }

            return true;
        }

        public bool AddInvitation(InvitationDTO invitationDTO)
        {
            if (!ValidateInvitation(invitationDTO))
                return false;

            try
            {
                invitationDTO.Status = InvitationStatus.Created;
                invitationDTO.StartDate = DateTime.Now;

                var entity = Mapper.Map<invitation>(invitationDTO);

                unitOfWork.Invitation.Add(entity);
                
                unitOfWork.Save();
            }
            catch
            {
                return false;
            }

            return true;
        }

        public bool EndInvitation(int Id)
        {
            try
            {
                var entity = unitOfWork.Invitation.Get(Id);

                entity.EndDate = DateTime.Now;
                
                unitOfWork.Save();
            }
            catch
            {
                return false;
            }

            return true;
        }

        public ActiveConsignmentDTO SavePackageId(InvitationExtended invitation)
        {

            var entity = unitOfWork.Invitation.Get(invitation.Id);
            entity.Status = InvitationStatus.ConsignmentActive;
            entity.EndDate = DateTime.Now;

            var consignment = _consignmentService.CreateConsignmentFromInvitation(invitation);

            using (TransactionScope scope = new TransactionScope())
            {
                //TODO: Only keep one last unitOfWork.Save, so we can "rollback" if error"
                unitOfWork.Consignment.Add(consignment);
                unitOfWork.Save();

                var consignmentDTO = Mapper.Map<ConsignmentDTO>(consignment);

                var packageInformation = unitOfWork.PackageInformation.UpdatePackageInformation(consignmentDTO);
                unitOfWork.PackageInformation.Add(packageInformation);
                unitOfWork.Save();

                scope.Complete();
            }

            //Find and return active consignment containing package API data
            if (consignment == null)
            {
                throw new ArgumentException();
            }

            var consignmentEntity = unitOfWork.ActiveConsignment.Find(x => x.Id == consignment.Id).FirstOrDefault();
            var dto = Mapper.Map<ActiveConsignmentDTO>(consignmentEntity);

            unitOfWork.Save();

            return dto;
        }

        public bool ValidateInvitation(InvitationDTO invitation)
        {
            if (invitation.ReceiverPersonId == invitation.SenderPersonId)
                return false;

            return true;
        }

        
    }
}