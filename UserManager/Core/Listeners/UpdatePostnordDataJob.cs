using AutoMapper;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using UserManager.Core.Enums;
using UserManager.Core.Interfaces;
using UserManager.Core.Services;
using UserManager.DTO;

namespace UserManager.Core.Listeners
{
    public class UpdatePostnordDataJob : IJob
    {
        private UnitOfWork unitOfWork = new UnitOfWork(new masterEntitiesMYSQL());
        private IConsignmentService _consignmentService;

        public UpdatePostnordDataJob() : this(new ConsignmentService())
        {
        }

        public UpdatePostnordDataJob(IConsignmentService consignmentService)
        {
            _consignmentService = consignmentService;
        }

        public Task Execute(IJobExecutionContext context)
        {
            var activeConsignments = unitOfWork.Consignment.Find(x => x.Status == 1).ToList();

            activeConsignments.ForEach(consignment =>
            {
                var consignmentDTO = Mapper.Map<ConsignmentDTO>(consignment);
                var packageInformation = unitOfWork.PackageInformation.UpdatePackageInformation(consignmentDTO);

                consignment.Status = ConsignmentStatus.Finished;
                //TODO: Skapa en vettig service som kan hantera postnord respons och sätta rätt consignmentstatus

                unitOfWork.PackageInformation.Add(packageInformation);
                unitOfWork.Save();
            });

            return Task.FromResult(true);
        }
    }
}