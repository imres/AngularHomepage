using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UserManager.DTO
{
    public class BankIdCollectDto
    {
        /// <summary>
        /// The orderRef in question.
        /// </summary>
        public string orderRef { get; set; }

        /// <summary>
        /// pending: The order is being processed. hintCode describes the status of the order.
        ///failed: Something went wrong with the order.hintCode describes the error.
        ///complete: The order is complete.completionData holds user information.
        /// </summary>
        public string status { get; set; }

        /// <summary>
        /// Only present for pending and failed orders.
        /// </summary>
        public string hintCode { get; set; }

        /// <summary>
        /// Only present for complete orders. 
        /// </summary>
        public CompletionData completionData { get; set; }

    }

    public class CompletionData
    {
        public User user { get; set; }
        public Device device { get; set; }
        public Cert cert { get; set; }
        public string signature { get; set; }
        public string ocspResponse { get; set; }
    }

    public class User
    {
        public string personalNumber { get; set; }
        public string name { get; set; }
        public string givenName { get; set; }
        public string surname { get; set; }
    }

    public class Device
    {
        public string ipAddress { get; set; }
    }

    public class Cert
    {
        public string notBefore { get; set; }
        public string notAfter { get; set; }
    }
}