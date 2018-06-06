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
    public class PackageInformationRepository : CustomMapper, IPackageInformation
    {
        private IIORepository _IORepository;

        public PackageInformationRepository() : this(new IORepository())
        {
        }

        public PackageInformationRepository(IIORepository IORepository)
        {
            _IORepository = IORepository;
        }

        private bool timeCheckEnabled = true;

        /// <summary>
        /// If package information does not exist on consignment id, create new row. Otherwise update existing row with new content 
        /// </summary>
        public void UpdatePackageInformation(ConsignmentDTO consignment)
        {
            UpdateOrCreateRow(consignment);
        }

        private void UpdateOrCreateRow(ConsignmentDTO consignment)
        {
            using (var context = new masterEntities())
            {
                var packageInformationExist = context.PackageInformation.Any(x => x.ConsignmentId == consignment.Id);

                if (packageInformationExist)
                {
                    try
                    {
                        UpdateRow(consignment);
                    }
                    catch
                    {
                        //Handle error on postnord api hit?
                    }

                    return;
                }

                CreateNewRow(consignment);
            }
        }

        private void UpdateRow(ConsignmentDTO consignment)
        {
            using (var context = new masterEntities())
            {
                var entity = context.PackageInformation.Where(x => x.ConsignmentId == consignment.Id).First();

                var hourDifference = (DateTime.Now - entity.LastUpdated).TotalHours;

                //Only hit PostNord api if one hour passed since last update
                if (!timeCheckEnabled || hourDifference > 0.05)
                {
                    var packageInformation = GetPackageInformation(consignment.PackageId).ToString();

                    entity.Content = packageInformation;
                    entity.LastUpdated = DateTime.Now;
                }

                context.SaveChanges();
            }
        }

        private void CreateNewRow(ConsignmentDTO consignment)
        {
            using (var context = new masterEntities())
            {
                string packageInformation = string.Empty;

                try
                {
                    packageInformation = GetPackageInformation(consignment.PackageId).ToString();
                }
                catch
                {
                    packageInformation = PostNordResponseData.PostNordResponseMock;
                }
                

                var entity = new PackageInformation
                {
                    Content = packageInformation,
                    ConsignmentId = consignment.Id,
                    LastUpdated = DateTime.Now
                };

                context.PackageInformation.Add(entity);

                context.SaveChanges();
            }
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

                    //.trackingInformationResponse.shipments.Any()
                    var test = result.GetType().GetProperty("shipments").GetValue(result);

                    if (result == null)
                        throw new NullReferenceException();
                    //else if ()
                    //    throw new MissingFieldException();
                    else
                        i = 4;
                }

                return result;
            }
            catch
            {
                return new ArgumentNullException();
            }
        }
    }
}