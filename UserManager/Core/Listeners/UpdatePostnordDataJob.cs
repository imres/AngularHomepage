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
        private IPackageInformationService _packageInformationService;

        public UpdatePostnordDataJob() : this(new ConsignmentService(), new PackageInformationService())
        {
        }

        public UpdatePostnordDataJob(IConsignmentService consignmentService, IPackageInformationService packageInformationService)
        {
            _consignmentService = consignmentService;
            _packageInformationService = packageInformationService;
        }

        public Task Execute(IJobExecutionContext context)
        {
            var activeConsignments = unitOfWork.Consignment.Find(x => x.Status == 1).ToList();

            activeConsignments.ForEach(consignment =>
            {
                var consignmentDTO = Mapper.Map<ConsignmentDTO>(consignment);
                var packageInformation = _packageInformationService.UpdatePackageInformation(consignmentDTO);
                //TODO: Skapa en vettig service som kan hantera postnord respons och sätta rätt consignmentstatus
                _consignmentService.UpdateConsignmentStatus(consignmentDTO);

                unitOfWork.Save();
            });

            return Task.FromResult(true);
        }
    }
}