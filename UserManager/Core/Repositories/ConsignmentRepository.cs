using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using UserManager.Core.Enums;
using UserManager.Core.Interfaces;
using UserManager.Core.Mappers;
using UserManager.DTO;

namespace UserManager.Core.Repositories
{
    public class ConsignmentRepository : Mapper, IConsigment
    {
        /// <summary>
        /// Add new Consignment
        /// </summary>
        /// <param name="invitationDTO"></param>
        public void AddConsignment(InvitationDTO invitationDTO)
        {
            using (var context = new masterEntities())
            {
                //Transform invitation to consignment
                var consignment = new Consignment
                {
                    ConsignmentId = GetMaxInteger<Consignment>(x => x.ConsignmentId),
                    Id = GetMaxInteger<Consignment>(x => x.Id),
                    PaymentMethod = invitationDTO.PaymentMethod.GetValueOrDefault(),
                    ReceiverPersonId = invitationDTO.ReceiverPersonId,
                    SenderPersonId = invitationDTO.SenderPersonId,
                    RequestedDepositAmount = invitationDTO.RequestedDepositAmount.GetValueOrDefault(),
                    Status = ConsignmentStatus.ConsignmentCreated
                };

                context.Consignment.Add(consignment);
                context.SaveChanges();

                //var test = GetMaxInteger<Consignment>(x => x.ConsignmentId);
            };
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

        /// <summary>
        /// Get Consignments by PersonId
        /// </summary>
        /// <param name="PersonId"></param>
        /// <returns></returns>
        public IEnumerable<ConsignmentDTO> GetConsignments(string PersonId)
        {
            throw new NotImplementedException();
        }
    }
}