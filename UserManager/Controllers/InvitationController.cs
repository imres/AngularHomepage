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
    public class InvitationController : ApiController
    {
        private IInvitationService _invitationService;
        private IInvitation _invitationRepository;

        InvitationController()
            : this(new InvitationService(), new InvitationRepository())
        {
        }

        public InvitationController(IInvitationService invitationService, IInvitation invitationRepository)
        {
            _invitationService = invitationService;
            _invitationRepository = invitationRepository;
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
                
                var invitationEnded = _invitationService.DeclineInvitation(Id);

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
            IEnumerable<InvitationDTO> invitations = _invitationRepository.GetInvitations(Id);

            return Request.CreateResponse(HttpStatusCode.OK, invitations);

        }

    }
}
 