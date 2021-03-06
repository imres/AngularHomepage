﻿using Newtonsoft.Json;
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

        /// <summary>
        /// Get package information from PostNord
        /// </summary>
        /// <returns>Package information</returns>
        public object GetPackageInformation(string PackageId)
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