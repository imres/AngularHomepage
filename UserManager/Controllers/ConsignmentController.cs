﻿using Newtonsoft.Json;
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
using UserManager.Core;
using UserManager.Core.Services;

namespace UserManager.Controllers
{
    public class ConsignmentController: ApiController
    {
        public UnitOfWork unitOfWork = new UnitOfWork(new masterEntities());
        private IInvitationService _invitationService;
        private IConsignmentService _consignmentService;

        public ConsignmentController() : this(new InvitationService(), new ConsignmentService())
        {
        }

        public ConsignmentController(IInvitationService invitationService, IConsignmentService consignmentService)
        {
            _invitationService = invitationService;
            _consignmentService = consignmentService;
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

                var consignment = _consignmentService.CreateConsignmentFromInvitation(invitation);
                unitOfWork.Consignment.Add(consignment);
                unitOfWork.Save();

                _invitationService.EndInvitation(invitation.Id);

                return Request.CreateResponse(HttpStatusCode.OK); //: Request.CreateResponse(HttpStatusCode.Forbidden, invitation);
            }
        }

        [ActionName("GetConsignments")]
        [HttpGet]
        public HttpResponseMessage GetConsignments(string Id)
        {
            //IEnumerable<InvitationDTO> invitations = _invitationRepository.GetInvitations(Id);
            IEnumerable<ActiveConsignmentDTO> consignments = _consignmentService.GetActiveConsignments(Id);

            return Request.CreateResponse(HttpStatusCode.OK, consignments);

        }

        [ActionName("GetArchivedConsignments")]
        [HttpGet]
        public HttpResponseMessage GetArchivedConsignments(string Id)
        {
            //IEnumerable<InvitationDTO> invitations = _invitationRepository.GetInvitations(Id);
            IEnumerable<ActiveConsignmentDTO> consignments = unitOfWork.Consignment.GetArchivedConsignments(Id);

            return Request.CreateResponse(HttpStatusCode.OK, consignments);

        }
        [ActionName("GetFinishedConsignments")]
        [HttpGet]
        public HttpResponseMessage GetFinishedConsignments(string Id)
        {
            //IEnumerable<InvitationDTO> invitations = _invitationRepository.GetInvitations(Id);
            IEnumerable<ActiveConsignmentDTO> consignments = unitOfWork.Consignment.GetFinishedConsignments(Id);

            return Request.CreateResponse(HttpStatusCode.OK, consignments);

        }
    }
}