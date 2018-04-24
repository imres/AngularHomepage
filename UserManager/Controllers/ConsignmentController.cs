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
        private IConsigment _consignmentRepository;
        private IInvitation _invitationRepository;

        ConsignmentController()
            : this(
                  new ConsignmentRepository(),
                  new InvitationRepository()
                  )
        {
        }

        public ConsignmentController
            (
            IConsigment consignmentRepository,
            IInvitation invitationRepository
            )
        {
            _consignmentRepository = consignmentRepository;
            _invitationRepository = invitationRepository;
        }

        [ActionName("AddConsignment")]
        [HttpPost]
        public HttpResponseMessage AddConsignment(InvitationExtended invitation)
        {
            using (HttpClient http = new HttpClient())
            {
                this.Request.RequestUri = new Uri("http://localhost:65192");

                if (this.Request.Method == HttpMethod.Get)
                {
                    this.Request.Content = null;
                }

                _consignmentRepository.AddConsignment(invitation);
                _invitationRepository.EndInvitation(invitation.Id);

                return Request.CreateResponse(HttpStatusCode.OK); //: Request.CreateResponse(HttpStatusCode.Forbidden, invitation);
            }
        }

        // GET: api/User
        [ActionName("GetConsignments")]
        [HttpGet]
        public HttpResponseMessage GetConsignments(string Id)
        {
            //IEnumerable<InvitationDTO> invitations = _invitationRepository.GetInvitations(Id);
            IEnumerable<ConsignmentDTO> consignments = _consignmentRepository.GetConsignments(Id);

            return Request.CreateResponse(HttpStatusCode.OK, consignments);

        }

        [ActionName("GetArchivedConsignments")]
        [HttpGet]
        public HttpResponseMessage GetArchivedConsignments(string Id)
        {
            //IEnumerable<InvitationDTO> invitations = _invitationRepository.GetInvitations(Id);
            IEnumerable<ConsignmentDTO> consignments = _consignmentRepository.GetArchivedConsignments(Id);

            return Request.CreateResponse(HttpStatusCode.OK, consignments);

        }
    }
}