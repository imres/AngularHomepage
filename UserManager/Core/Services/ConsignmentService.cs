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
    public class ConsignmentService : IConsignmentService
    {
        private UnitOfWork unitOfWork = new UnitOfWork(new masterEntitiesMYSQL());

        public consignment CreateConsignmentFromInvitation(InvitationExtended invitation)
        {
            if (!ValidateInvitationExtended(invitation))
            {
                throw new Exception();
            }

            var consignment = new consignment
            {
                PaymentMethod = invitation.PaymentMethod.GetValueOrDefault(),
                ReceiverPersonId = invitation.ReceiverPersonId,
                SenderPersonId = invitation.SenderPersonId,
                Status = ConsignmentStatus.Active,
                StartDate = DateTime.Now,
                PackageId = invitation.PackageId,
                DepositedAmount = invitation.RequestedDepositAmount,
                Title = invitation.Title,
                Description = invitation.Description,
                DeliveryAddress = invitation.DeliveryAddress,
                DeliveryPostalCode = invitation.DeliveryPostalCode,
                DeliveryCity = invitation.DeliveryCity
            };

            return consignment;
        }

        public ConsignmentDTO AddConsignment(InvitationExtended invitation)
        {
            try
            {
                //Transform invitation to consignment
                var consignment = CreateConsignmentFromInvitation(invitation);

                unitOfWork.Consignment.Add(consignment);

                var consignmentDTO = Mapper.Map<ConsignmentDTO>(consignment);

                return consignmentDTO;
            }
            catch (Exception)
            {

                return null;
            }
        }

        public IEnumerable<ActiveConsignmentDTO> GetActiveConsignments(string PersonId)
        {
            var packageInformations = new List<packageinformation>();

            IEnumerable<activeconsignment> consignments = unitOfWork.ActiveConsignment
                .Find(x => (x.ReceiverPersonId == PersonId || x.SenderPersonId == PersonId) && x.Status == ConsignmentStatus.Active).ToList();
            
            var activeConsignmentsDTO = Mapper.Map<IEnumerable<ActiveConsignmentDTO>>(consignments).ToList();

            activeConsignmentsDTO.ForEach(consignment =>
            {
                var packageInfo = unitOfWork.PackageInformation.UpdatePackageInformation(consignment);

                if(packageInfo.Id == 0)
                    unitOfWork.PackageInformation.Add(packageInfo);
                //packageInformations.Add(packageInfo);
            });

            //unitOfWork.PackageInformation.AddRange(packageInformations);
            unitOfWork.Save();

            return activeConsignmentsDTO;
        }

        public IEnumerable<ActiveConsignmentDTO> GetAllConsignments()
        {
            IEnumerable<activeconsignment> consignments = unitOfWork.ActiveConsignment.GetAll();

            var allConsignmentsDTO = Mapper.Map<IEnumerable<ActiveConsignmentDTO>>(consignments).ToList();

            return allConsignmentsDTO;
        }

        private bool ValidateInvitationExtended(InvitationExtended invitation)
        {
            if (invitation.PackageId != null)
            {
                var packageIdAlreadyExists = unitOfWork.Consignment.Find(x => x.PackageId == invitation.PackageId).Any();

                if (packageIdAlreadyExists)
                {
                    return false;
                }
            }

            return true;
        }
    }
}