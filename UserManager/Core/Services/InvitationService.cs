using AutoMapper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Web;
using UserManager.Core.Enums;
using UserManager.Core.Interfaces;
using UserManager.Core.Repositories;
using UserManager.Core.Translations;
using UserManager.DTO;
using UserManager.Models;

namespace UserManager.Core.Services
{
    public class InvitationService : IInvitationService
    {
        private UnitOfWork unitOfWork = new UnitOfWork(new masterEntitiesMYSQL());
        private IConsignmentService _consignmentService;
        private IPackageInformationService _packageInformationService;

        public InvitationService() : this(new ConsignmentService(), new PackageInformationService())
        {

        }

        public InvitationService(IConsignmentService consignmentService, IPackageInformationService packageInformationService)
        {
            _consignmentService = consignmentService;
            _packageInformationService = packageInformationService;
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

            ValidatePackageIdIsUnused(invitation);
            var consignment = _consignmentService.CreateConsignmentFromInvitation(invitation);

            using (TransactionScope scope = new TransactionScope())
            {
                unitOfWork.Consignment.Add(consignment);
                unitOfWork.Save();

                var consignmentDTO = Mapper.Map<ConsignmentDTO>(consignment);
                var packageInformation = _packageInformationService.UpdatePackageInformation(consignmentDTO, true);
                unitOfWork.PackageInformation.Add(packageInformation);
                unitOfWork.Save();

                _consignmentService.UpdateConsignmentStatus(consignmentDTO);
                ValidatePackageDeliveryPostCode(invitation, packageInformation);
                scope.Complete();
            }

            //Find and return active consignment containing package API data
            if (consignment == null)
            {
                throw new ArgumentNullException();
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

        private void ValidatePackageDeliveryPostCode(InvitationExtended invitation, packageinformation packageInformation)
        {
            var result = JsonConvert.DeserializeObject<Object>(packageInformation.Content);
            var trackingInfo = JsonConvert.DeserializeObject<PostnordShipmentResponseDTO>(result.ToString());
            int destinationPostCode = int.Parse(trackingInfo.trackingInformationResponse.shipments.FirstOrDefault().consignee.address.postCode.Replace(" ", string.Empty));

            if (invitation.DeliveryPostalCode != destinationPostCode)
            {
                throw new ArgumentException(ValidationTranslations.Invalid_PostCode);
            }
        }

        private void ValidatePackageIdIsUnused(InvitationExtended invitation)
        {
            if (invitation.PackageId != null)
            {
                var packageIdAlreadyExists = unitOfWork.Consignment.Find(x => x.PackageId == invitation.PackageId).Any();

                if (packageIdAlreadyExists)
                {
                    throw new ArgumentException(ValidationTranslations.Invalid_PackageID_AlreadyUsed);
                }
            }
        }


    }
}