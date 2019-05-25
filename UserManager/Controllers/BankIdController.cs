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
using UserManager.DTO;
using UserManager.Models;
using Http = System.Net.WebRequestMethods.Http;
using System.Security.Cryptography.X509Certificates;
using System.Web.Script.Serialization;
using System.Threading;
using UserManager.Core.Services;
using UserManager.Core;
using AutoMapper;

namespace UserManager.Controllers
{
    public class BankIdController : ApiController
    {
        private UnitOfWork unitOfWork = new UnitOfWork(new masterEntitiesMYSQL());
        protected PersonCrypography _personCryptography = new PersonCrypography();
        private IBankIdService _bankIdService;

        public BankIdController()
            : this(new BankIdService())
        {
        }

        public BankIdController( IBankIdService bankIdService)
        {
            _bankIdService = bankIdService;
        }

        [ActionName("BankIdAuth")]
        [HttpGet]
        public HttpResponseMessage BankIdAuth(string Id)
        {
            var result = "";

            try
            {
                result = _bankIdService.AuthenticatePersonId(Id);
            }
            catch (WebException)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            

            return Request.CreateResponse(HttpStatusCode.OK, result);

        }

        [ActionName("BankIdCollect")]
        [HttpPost]
        public HttpResponseMessage BankIdCollect(BankIdCollectDto bankIdAuthResponse)
        {
            var person = new PersonDTO();

            using (HttpClient http = new HttpClient())
            {
                this.Request.RequestUri = new Uri("http://localhost:65192");

                if (this.Request.Method == HttpMethod.Get)
                {
                    this.Request.Content = null;
                }

                try
                {
                    var collectResponse = _bankIdService.CollectRequest(bankIdAuthResponse);

                    if (collectResponse.status == "failed")
                        return Request.CreateResponse(HttpStatusCode.PreconditionFailed);

                    if(collectResponse.completionData != null)
                    {
                        person = unitOfWork.Person.AuthenticateBankId(collectResponse);

                        if (person == null)
                        {
                            var dto = new BankIdPersonDTO(collectResponse.completionData.user);
                            var entity = unitOfWork.Person.AddPerson(dto);

                            person = Mapper.Map<PersonDTO>(entity);

                            person = _personCryptography.GenerateSignature(person);
                        }
                    }
                        

                }
                catch (WebException)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }
            }

            return Request.CreateResponse(HttpStatusCode.OK, person);
        }
    }
}