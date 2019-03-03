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
    public class PaymentController : ApiController
    {

        private IPaymentService _paymentService;

        PaymentController()
            : this(new PaymentService())
        {
        }

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [ActionName("Payment")]
        [HttpPost]
        public HttpResponseMessage Payment(InvitationDTO invitation, string stripeEmail, string stripeToken)
        {

            using (HttpClient http = new HttpClient())
            {
                this.Request.RequestUri = new Uri("http://localhost:65192");

                if (this.Request.Method == HttpMethod.Get)
                {
                    this.Request.Content = null;
                }

                Payment payment;

                try
                {
                    payment = _paymentService.ProcessPayment(invitation, stripeEmail, stripeToken);
                }
                catch (InvalidOperationException ex)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }

                return Request.CreateResponse(HttpStatusCode.OK, payment);
            }
        }

        [ActionName("MockPayment")]
        [HttpPost]
        public HttpResponseMessage MockPayment(InvitationDTO invitation)
        {

            using (HttpClient http = new HttpClient())
            {
                this.Request.RequestUri = new Uri("http://localhost:65192");

                if (this.Request.Method == HttpMethod.Get)
                {
                    this.Request.Content = null;
                }

                var validPayment = _paymentService.MockProcessPayment(invitation);

                if (!validPayment)
                    return Request.CreateResponse(HttpStatusCode.Conflict, invitation);

                return Request.CreateResponse(HttpStatusCode.OK, invitation);
            }
        }
    }
}
 