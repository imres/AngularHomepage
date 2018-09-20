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

    public class ConsignmentRepository : Repository<Consignment>, IConsignmentRepository
    {
        public ConsignmentRepository(masterEntities context)
            : base(context)
        {

        }

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

        public IEnumerable<ActiveConsignmentDTO> GetArchivedConsignments(string PersonId)
        {
            using (masterEntities context = new masterEntities())
            {
                IEnumerable<ActiveConsignment> archivedConsignments = context.ActiveConsignment
                    .Where(x => (x.ReceiverPersonId == PersonId || x.SenderPersonId == PersonId) && x.Status == ConsignmentStatus.Archived);

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