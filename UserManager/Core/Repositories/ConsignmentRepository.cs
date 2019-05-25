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

        public IEnumerable<ActiveConsignmentDTO> GetAllConsignments()
        {
            using (masterEntities context = new masterEntities())
            {
                IEnumerable<ActiveConsignment> allConsignments = context.ActiveConsignment;

                var allConsignmentsDTO = Mapper.Map<IEnumerable<ActiveConsignmentDTO>>(allConsignments).ToList();

                return allConsignmentsDTO;
            }
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
        public ActiveConsignmentDTO ArchiveConsignment(string PackageId)
        {
            using (masterEntities context = new masterEntities())
            {
                var consignmentToArchive = context.ActiveConsignment.Where(x => x.PackageId == PackageId).First();

                consignmentToArchive.Status = 10;

                context.SaveChanges();

                var dto = Mapper.Map<ActiveConsignmentDTO>(consignmentToArchive);

                return dto;
            }
        }
    }
}