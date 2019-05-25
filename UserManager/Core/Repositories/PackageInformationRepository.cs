using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Reflection;
using System.Resources;
using UserManager.Core.Enums;
using UserManager.Core.Interfaces;
using UserManager.Core.Mappers;
using UserManager.Core.Mock;
using UserManager.DTO;
using UserManager.Models;

namespace UserManager.Core.Repositories
{
    public class PackageInformationRepository : Repository<packageinformation>, IPackageInformationRepository
    {
        public PackageInformationRepository(masterEntitiesMYSQL context) : base (context)
        {

        }

        private bool timeCheckEnabled = false;

        public packageinformation UpdatePackageInformation(ConsignmentDTO consignment)
        {
            var packageInformationExist = Context.packageinformation.Any(x => x.ConsignmentId == consignment.Id);

            if (packageInformationExist)
            {
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
            var entity = Context.packageinformation.Where(x => x.ConsignmentId == consignment.Id).First();

            var hourDifference = (DateTime.Now - entity.LastUpdated).TotalHours;

            //Only hit PostNord api if one hour passed since last update
            if (!timeCheckEnabled || hourDifference > 0.05)
            {
                var packageInformation = string.Empty;

                try
                {
                    packageInformation = GetPackageInformation(consignment.PackageId).ToString();
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
                packageInformation = GetPackageInformation(consignment.PackageId).ToString();
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
        
        /// <summary>
        /// Get package information from PostNord
        /// </summary>
        /// <returns>Package information</returns>
        private object GetPackageInformation(string PackageId)
        {
            //RR747540648SE

            try
            {
                object result = null;

                //Give 4 attempts at API before returning null
                for (int i = 0; i < 4; i++)
                {
                    var requestString = string.Format("https://api2.postnord.com/rest/shipment/v1/trackandtrace/findByIdentifier.json?id={0}&locale=en&apikey=e6e47dc24100ab0e9f60bab3290d07ac", PackageId);

                    var gettimeline = WebRequest.Create(requestString) as HttpWebRequest;

                    gettimeline.Method = "GET";


                    string respbody = null;

                    using (var response = gettimeline.GetResponse().GetResponseStream())//there request sends
                    {
                        var resReader = new StreamReader(response);
                        respbody = resReader.ReadToEnd();
                    }

                    result = JsonConvert.DeserializeObject<Object>(respbody);

                    var trackingInfo = JsonConvert.DeserializeObject<PostnordShipmentResponseDTO>(result.ToString());

                    if (!trackingInfo.trackingInformationResponse.shipments.Any())
                        throw new ArgumentNullException();

                    if (result != null)
                        i = 4;
                }

                return result;
            }
            catch
            {
                throw new ArgumentNullException();
            }
        }
    }
}