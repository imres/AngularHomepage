using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using UserManager.Core;
using UserManager.Core.Interfaces;
using UserManager.Core.Repositories;
using UserManager.Core.Services;
using UserManager.DTO;
using UserManager.Models;
using Http = System.Net.WebRequestMethods.Http;

namespace UserManager.Controllers
{
    public class InvitationController : ApiController
    {
        private UnitOfWork unitOfWork = new UnitOfWork(new masterEntities());

        private IInvitationService _invitationService;

        InvitationController()
            : this(new InvitationService())
        {
        }

        public InvitationController(IInvitationService invitationService)
        {
            _invitationService = invitationService;
        }

        [ActionName("Invite")]
        [HttpPost]
        public HttpResponseMessage Invitation(InvitationDTO invitation)
        {

            using (HttpClient http = new HttpClient())
            {
                this.Request.RequestUri = new Uri("http://localhost:65192");

                if (this.Request.Method == HttpMethod.Get)
                {
                    this.Request.Content = null;
                }

                var validInvitation = _invitationService.AddInvitation(invitation);

                if (!validInvitation)
                    return Request.CreateResponse(HttpStatusCode.Forbidden, invitation);

                return Request.CreateResponse(HttpStatusCode.OK, invitation);
            }
        }

        [ActionName("AcceptInvitation")]
        [HttpPost]
        public HttpResponseMessage AcceptInvitation(InvitationDTO invitation)
        {
            using (HttpClient http = new HttpClient())
            {
                this.Request.RequestUri = new Uri("http://localhost:65192");

                if (this.Request.Method == HttpMethod.Get)
                {
                    this.Request.Content = null;
                }

                var invitationAccepted = _invitationService.AcceptInvitation(invitation);

                if (!invitationAccepted)
                    return Request.CreateResponse(HttpStatusCode.Conflict);

                return Request.CreateResponse(HttpStatusCode.OK);
            }
        }

        [ActionName("SavePackageId")]
        [HttpPost]
        public HttpResponseMessage SavePackageId(InvitationExtended invitation)
        {
            using (HttpClient http = new HttpClient())
            {
                this.Request.RequestUri = new Uri("http://localhost:65192");

                if (this.Request.Method == HttpMethod.Get)
                {
                    this.Request.Content = null;
                }

                var consignmentAdded = _invitationService.SavePackageId(invitation);

                if (consignmentAdded == null)
                    return Request.CreateResponse(HttpStatusCode.Conflict, invitation);

                return Request.CreateResponse(HttpStatusCode.OK, consignmentAdded);
            }
        }

        [ActionName("EndInvitation")]
        [HttpGet]
        public HttpResponseMessage EndInvitation(int Id)
        {
            using (HttpClient http = new HttpClient())
            {
                this.Request.RequestUri = new Uri("http://localhost:65192");

                if (this.Request.Method == HttpMethod.Get)
                {
                    this.Request.Content = null;
                }

                var invitationEnded = _invitationService.EndInvitation(Id);

                if(!invitationEnded)
                    return Request.CreateResponse(HttpStatusCode.Forbidden);

                return Request.CreateResponse(HttpStatusCode.OK);
            }
        }

        // GET: api/User
        [ActionName("GetInvitations")]
        [HttpGet]
        public HttpResponseMessage GetInvitations(string Id)
        {
            IEnumerable<InvitationDTO> invitations = unitOfWork.Invitation.GetInvitations(Id);

            return Request.CreateResponse(HttpStatusCode.OK, invitations);

        }
        
        [ActionName("GetUnrespondedInvitations")]
        [HttpGet]
        public HttpResponseMessage GetUnrespondedInvitations(string Id)
        {
            IEnumerable<InvitationDTO> unrespondedInvitations = unitOfWork.Invitation.GetUnrespondedInvitations(Id);

            return Request.CreateResponse(HttpStatusCode.OK, unrespondedInvitations);
        }
    }
}
 