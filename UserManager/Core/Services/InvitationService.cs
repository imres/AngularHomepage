﻿using AutoMapper;
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
        private UnitOfWork unitOfWork = new UnitOfWork(new masterEntities());
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

                var entity = Mapper.Map<Invitation>(invitationDTO);

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
            ActiveConsignmentDTO activeConsignment = null;

            try
            {
                var entity = unitOfWork.Invitation.Get(invitation.Id);
                entity.Status = InvitationStatus.ConsignmentActive;
                entity.EndDate = DateTime.Now;

                //TODO - Different dbcontext, need to use same
                var consignment = _consignmentService.CreateConsignmentFromInvitation(invitation);

                unitOfWork.Consignment.Add(consignment);

                unitOfWork.Save();

                var consignmentDTO = Mapper.Map<ConsignmentDTO>(consignment);

                var packageInformation = unitOfWork.PackageInformation.UpdatePackageInformation(consignmentDTO);

                unitOfWork.PackageInformation.Add(packageInformation);
                unitOfWork.Save();

                //Find and return active consignment containing package API data
                if (consignment != null)
                {
                    var consignmentEntity = unitOfWork.ActiveConsignment.Find(x => x.Id == consignment.Id).FirstOrDefault();

                    var dto = Mapper.Map<ActiveConsignmentDTO>(consignmentEntity);

                    activeConsignment = dto;
                }

                unitOfWork.Save();
            }
            catch (ArgumentException)
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