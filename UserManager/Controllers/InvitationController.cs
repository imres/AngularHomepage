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
    public class InvitationController : ApiController
    {
        private IInvitation _invitationRepository;

        InvitationController()
            : this(new InvitationRepository())
        {
        }

        public InvitationController(IInvitation invitationRepository)
        {
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

                _invitationRepository.AddInvitation(invitation);

                return Request.CreateResponse(HttpStatusCode.OK, invitation); //: Request.CreateResponse(HttpStatusCode.Forbidden, invitation);
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
 