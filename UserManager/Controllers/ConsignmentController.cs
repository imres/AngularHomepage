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

namespace UserManager.Controllers
{
    public class ConsignmentController: ApiController
    {
        private IInvitation _invitationRepository;
        private IConsigment _consignmentRepository;

        public ConsignmentController
            (
            IInvitation invitationRepository,
            IConsigment consignmentRepository
            )
        {
            _invitationRepository = invitationRepository;
            _consignmentRepository = consignmentRepository;
        }

        [ActionName("AddConsignment")]
        [HttpPost]
        public HttpResponseMessage AddConsignment(InvitationDTO invitation)
        {
            using (HttpClient http = new HttpClient())
            {
                this.Request.RequestUri = new Uri("http://localhost:65192");

                if (this.Request.Method == HttpMethod.Get)
                {
                    this.Request.Content = null;
                }

                _consignmentRepository.AddConsignment(invitation);

                return Request.CreateResponse(HttpStatusCode.OK); //: Request.CreateResponse(HttpStatusCode.Forbidden, invitation);
            }
        }

        // GET: api/User
        [ActionName("GetConsignments")]
        [HttpGet]
        public HttpResponseMessage GetConsignments(string PersonId)
        {
            //IEnumerable<InvitationDTO> invitations = _invitationRepository.GetInvitations(Id);
            IEnumerable<ConsignmentDTO> consignments = _consignmentRepository.GetConsignments(PersonId);

            return Request.CreateResponse(HttpStatusCode.OK, consignments);

        }
    }
}