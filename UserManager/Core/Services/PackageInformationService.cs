using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.Core.Interfaces;
using UserManager.Core.Mock;
using UserManager.Core.Repositories;
using UserManager.DTO;
using UserManager.Models;

namespace UserManager.Core.Services
{
    public class PackageInformationService : IPackageInformationService
    {
        private UnitOfWork unitOfWork = new UnitOfWork(new masterEntitiesMYSQL());
        private bool timeCheckEnabled = false;

        public string GetLatestPostNordEventCode(ConsignmentDTO consignmentDTO)
        {
            var consignment = unitOfWork.Consignment.Get(consignmentDTO.Id);
            var packageInformation = unitOfWork.PackageInformation.Find(x => x.ConsignmentId == consignmentDTO.Id).FirstOrDefault();
            var result = JsonConvert.DeserializeObject<Object>(packageInformation.Content);
            var trackingInfo = JsonConvert.DeserializeObject<PostnordShipmentResponseDTO>(result.ToString());
            var eventCode = trackingInfo.trackingInformationResponse.shipments.FirstOrDefault().items.FirstOrDefault().events.LastOrDefault().eventCode;

            return eventCode;
        }

        public bool SavePackageInformation(ConsignmentDTO consignmentDTO)
        {
            try
            {
                using(var context = new masterEntitiesMYSQL())
                {
                    var packageInformation = UpdatePackageInformation(consignmentDTO);
                    context.packageinformation.Add(packageInformation);
                    context.SaveChanges();
                }
            }
            catch
            {
                return false;
            }

            return true;
        }

        

        public packageinformation UpdatePackageInformation(ConsignmentDTO consignment, bool isFirstTimeUpdate = false)
        {
            var packageInformationExist = unitOfWork.PackageInformation.Find(x => x.ConsignmentId == consignment.Id).Any();

            if (packageInformationExist)
            {
                if (isFirstTimeUpdate)
                {
                    throw new InvalidOperationException();
                }

                return UpdatePackageInformationRow(consignment);
            }

            return CreatePackageInformationRow(consignment);
        }

        /// <summary>
        /// Handle Package ID found in PackageInformation row in database, just update existing row
        /// </summary>
        /// <returns>Updated row</returns>
        private packageinformation UpdatePackageInformationRow(ConsignmentDTO consignment)
        {
            var entity = unitOfWork.PackageInformation.Find(x => x.ConsignmentId == consignment.Id).First();

            var hourDifference = (DateTime.Now - entity.LastUpdated).TotalHours;

            //Only hit PostNord api if one hour passed since last update
            if (!timeCheckEnabled || hourDifference > 0.05)
            {
                var packageInformation = string.Empty;

                try
                {
                    packageInformation = unitOfWork.PackageInformation.GetPackageInformation(consignment.PackageId).ToString();
                }
                catch (ArgumentNullException)
                {
                    packageInformation = PostNordResponseData.PostNordResponseMock;
                }

                entity.Content = packageInformation;
                entity.LastUpdated = DateTime.Now;
            }

            return entity;
        }

        /// <summary>
        /// Handle Package ID not registered in database
        /// </summary>
        /// <returns>Created row in PackageInformation table</returns>
        private packageinformation CreatePackageInformationRow(ConsignmentDTO consignment)
        {
            string packageInformation = string.Empty;

            try
            {
                packageInformation = unitOfWork.PackageInformation.GetPackageInformation(consignment.PackageId).ToString();
            }
            catch (ArgumentNullException)
            {
                packageInformation = PostNordResponseData.PostNordResponseMock;
            }

            var entity = new packageinformation
            {
                Content = packageInformation,
                ConsignmentId = consignment.Id,
                LastUpdated = DateTime.Now
            };

            return entity;
        }
    }
}