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
        private UnitOfWork unitOfWork = new UnitOfWork(new masterEntities());
        private object allConsignments;

        private string GetDeliveryAdress(InvitationExtended invitation)
        {
            if(invitation.CustomDeliveryAdress.Length > 0)
            {
                return invitation.CustomDeliveryAdress;
            }

            var person = unitOfWork.Person.Find(x => x.PersonId == invitation.ReceiverPersonId).FirstOrDefault();
            return person.Address;
        }

        public Consignment CreateConsignmentFromInvitation(InvitationExtended invitation)
        {
            var consignment = new Consignment
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
                DeliveryAdress = GetDeliveryAdress(invitation)
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
            var packageInformations = new List<PackageInformation>();

            IEnumerable<ActiveConsignment> consignments = unitOfWork.ActiveConsignment
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
            IEnumerable<ActiveConsignment> consignments = unitOfWork.ActiveConsignment.GetAll();

            var allConsignmentsDTO = Mapper.Map<IEnumerable<ActiveConsignmentDTO>>(consignments).ToList();

            return allConsignmentsDTO;
        }
    }
}