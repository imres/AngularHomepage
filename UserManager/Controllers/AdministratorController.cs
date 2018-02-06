using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
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
    public class AdministratorController : ApiController
    {
        private IAdministratorService _administratorService;

        AdministratorController()
            : this(new AdministratorService())
        {
        }

        public AdministratorController
            (IAdministratorService administratorService)
        {
            _administratorService = administratorService;
        }
        
        // GET: api/User
        [ActionName("CleanTable")]
        [HttpGet]
        public HttpResponseMessage CleanTable(string Id)
        {
            var cleanedTable = _administratorService.CleanTable(Id);

            if (!cleanedTable)
                return Request.CreateResponse(HttpStatusCode.Conflict);

            return Request.CreateResponse(HttpStatusCode.OK);

        }
    }
}