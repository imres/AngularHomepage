using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;
using UserManager.Core.Interfaces;
using UserManager.Core.Repositories;
using UserManager.Core.Services;
using UserManager.DTO;
using UserManager.Models;
using Http = System.Net.WebRequestMethods.Http;

namespace UserManager.Controllers
{
    public class PackageInformationController : ApiController
    {
        private IPackageInformationService _packageInformationService;

        public PackageInformationController() : this(new PackageInformationService())
        {
        }

        public PackageInformationController(IPackageInformationService packageInformationService)
        {
            _packageInformationService = packageInformationService;
        }

        [ActionName("PostGet")]
        [HttpPost]
        public HttpResponseMessage PostGet(ConsignmentDTO consignment)
        {
            using (HttpClient http = new HttpClient())
            {
                this.Request.RequestUri = new Uri("http://localhost:65192");

                if (this.Request.Method == HttpMethod.Get)
                {
                    this.Request.Content = null;
                }

                var savedPackageInfo = _packageInformationService.SavePackageInformation(consignment);

                if (!savedPackageInfo)
                    return Request.CreateResponse(HttpStatusCode.Conflict);

                return Request.CreateResponse(HttpStatusCode.OK);
            }
        }
    }
}
