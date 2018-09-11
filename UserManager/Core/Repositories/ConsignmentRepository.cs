using AutoMapper;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Transactions;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web.Script.Serialization;
using UserManager.Core.Enums;
using UserManager.Core.Interfaces;
using UserManager.Core.Mappers;
using UserManager.DTO;
using UserManager.Models;

namespace UserManager.Core.Repositories
{

    public class ConsignmentRepository : Repository, IConsigment
    {
        private IPackageInformation _packageInformationRepository;

        public ConsignmentRepository() 
            : this(new PackageInformationRepository())
        {
        }

        public ConsignmentRepository(IPackageInformation packageInformationRepository) : base()
        {
            _packageInformationRepository = packageInformationRepository;
        }


        /// <summary>
        /// Add new Consignment
        /// </summary>
        /// <param name="invitationDTO"></param>
        /// TODO: Snygga till mappning och id-sättning
        public ConsignmentDTO AddConsignment(InvitationExtended invitation)
        {
            

            using (var context = new masterEntities())
            {
                using (var scope = new TransactionScope())
                {
                    try
                    {
                        //Transform invitation to consignment
                        var consignment = new Consignment
                        {
                            PaymentMethod = invitation.PaymentMethod.GetValueOrDefault(),
                            ReceiverPersonId = invitation.ReceiverPersonId,
                            SenderPersonId = invitation.SenderPersonId,
                            Status = ConsignmentStatus.Active,
                            StartDate = DateTime.Now,
                            PackageId = invitation.PackageId,
                            DepositedAmount = invitation.RequestedDepositAmount
                        };

                        context.Consignment.Add(consignment);
                        context.SaveChanges();

                        var consignmentDTO = Mapper.Map<ConsignmentDTO>(consignment);

                        var packageInformation = _packageInformationRepository.UpdatePackageInformation(consignmentDTO);

                        context.PackageInformation.Add(packageInformation);
                        context.SaveChanges();
                        scope.Complete();

                        consignmentDTO.Id = consignment.Id;

                        return consignmentDTO;
                    }
                    catch (Exception)
                    {
                        scope.Dispose();

                        return null;
                    }
                };
            }
        }
        
        //public int GenericRepository<T>(Expression<Func<T, object>> p)
        //{
        //    using (var context = new masterEntities())
        //    {
        //        client
        //    };
        //}

        /// <summary>
        /// Delete Consignment by Id
        /// </summary>
        /// <param name="ConsignmentId"></param>
        public void DeleteConsignment(int ConsignmentId)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Get Consignment by Id
        /// </summary>
        /// <param name="ConsignmentId"></param>
        /// <returns></returns>
        public ConsignmentDTO GetConsignment(int ConsignmentId)
        {
            throw new NotImplementedException();
        }
        public ConsignmentDTO GetArchivedConsignments(int ConsignmentId)
        {
            throw new NotImplementedException();
        }
        public ConsignmentDTO GetFinishedConsignments(int ConsignmentId)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// Get Consignments by PersonId
        /// </summary>
        /// <param name="PersonId"></param>
        /// <returns></returns>
        public IEnumerable<ActiveConsignmentDTO> GetActiveConsignments(string PersonId)
        {
            using (var context = new masterEntities())
            {
                IEnumerable<ActiveConsignment> consignments = context.ActiveConsignment
                    .Where(x => (x.ReceiverPersonId == PersonId || x.SenderPersonId == PersonId) && x.Status < ConsignmentStatus.Completed);

                //var activeConsignmentsDTO = EntityToDtoMappingCollection<ActiveConsignment, ActiveConsignmentDTO>(consignments).ToList();
                var activeConsignmentsDTO = Mapper.Map<IEnumerable<ActiveConsignmentDTO>>(consignments).ToList();

                activeConsignmentsDTO.ForEach(consignment =>
                {
                    _packageInformationRepository.UpdatePackageInformation(consignment);
                });

                return activeConsignmentsDTO;
            }
        }
        public IEnumerable<ActiveConsignmentDTO> GetArchivedConsignments(string PersonId)
        {
            using (masterEntities context = new masterEntities())
            {
                IEnumerable<ActiveConsignment> archivedConsignments = context.ActiveConsignment
                    .Where(x => (x.ReceiverPersonId == PersonId || x.SenderPersonId == PersonId) && x.Status == ConsignmentStatus.Completed);

                var archivedConsignmentsDTO = Mapper.Map<IEnumerable<ActiveConsignmentDTO>>(archivedConsignments).ToList();

                return archivedConsignmentsDTO;
            }
        }
        public IEnumerable<ActiveConsignmentDTO> GetFinishedConsignments(string PersonId)
        {
            using (masterEntities context = new masterEntities())
            {
                IEnumerable<ActiveConsignment> finishedConsignments = context.ActiveConsignment
                    .Where(x => (x.ReceiverPersonId == PersonId || x.SenderPersonId == PersonId) && x.Status == 9);

                var finishedConsignmentsDTO = Mapper.Map<IEnumerable<ActiveConsignmentDTO>>(finishedConsignments).ToList();

                return finishedConsignmentsDTO;
            }
        }
    }
}