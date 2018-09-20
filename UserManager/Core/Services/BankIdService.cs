using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Web;
using UserManager.Core.Interfaces;
using UserManager.DTO;

namespace UserManager.Core.Services
{
    public class BankIdService : IBankIdService
    {
        public string AuthenticatePersonId(string personId)
        {
            //var store = new X509Store(StoreName.TrustedPublisher, StoreLocation.CurrentUser); //.LocalMachine);

            //store.Open(OpenFlags.ReadWrite);
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11;
            ServicePointManager.Expect100Continue = true;
            //var cert = new X509Certificate2(X509Certificate2.CreateFromCertFile("C:\\Users\\pontus\\Desktop\\BankID.cer"));
            //var cert = new X509Certificate2(X509Certificate.CreateFromCertFile("C:\\Users\\pontus\\Desktop\\BankID.cer"), "qwerty123", X509KeyStorageFlags.PersistKeySet);

            HttpWebRequest req = (HttpWebRequest)WebRequest.Create("https://appapi2.test.bankid.com/rp/v5/auth");
            req.ContentType = "application/json";
            req.Method = "POST";

            req.KeepAlive = true;

            req.ProtocolVersion = HttpVersion.Version10;

            X509Certificate2 Cert = new X509Certificate2();

            string CertPath = "C:\\Users\\pontus\\Desktop\\FPTestcert2_20150818_102329.pfx";

            string CertPwd = "qwerty123";

            Cert.Import(CertPath, CertPwd, X509KeyStorageFlags.Exportable);

            req.ClientCertificates.Add(Cert);

            var certcer = new X509Certificate2(X509Certificate2.CreateFromCertFile("C:\\Users\\pontus\\Desktop\\BankID.cer"));
            req.ClientCertificates.Add(certcer);

            req.AuthenticationLevel = System.Net.Security.AuthenticationLevel.None;

            Stream s = req.GetRequestStream();

            StreamWriter sw = new StreamWriter(s);

            string json = "{\"personalNumber\":\"" + personId + "\"," +
                          "\"endUserIp\":\"192.168.1.3\"}";

            sw.Write(json);

            sw.Close();

            s.Close();

            // submit synchronous HTTP request to Web server

            WebResponse rsp = req.GetResponse();

            // WebResponse provides stream-based access so let's go get it baby

            StreamReader sr = new StreamReader(rsp.GetResponseStream());

            var result = sr.ReadToEnd();

            return result;
        }

        public BankIdCollectDto CollectRequest(BankIdCollectDto bankIdAuthResponse)
        {
            var requestTimeStamp = DateTime.Now;

            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11;
            ServicePointManager.Expect100Continue = true;

            HttpWebRequest req = (HttpWebRequest)WebRequest.Create("https://appapi2.test.bankid.com/rp/v5/collect");
            req.ContentType = "application/json";
            req.Method = "POST";

            req.KeepAlive = true;

            req.ProtocolVersion = HttpVersion.Version10;

            X509Certificate2 Cert = new X509Certificate2();

            string CertPath = "C:\\Users\\pontus\\Desktop\\FPTestcert2_20150818_102329.pfx";

            string CertPwd = "qwerty123";

            Cert.Import(CertPath, CertPwd, X509KeyStorageFlags.Exportable);

            req.ClientCertificates.Add(Cert);

            var certcer = new X509Certificate2(X509Certificate2.CreateFromCertFile("C:\\Users\\pontus\\Desktop\\BankID.cer"));
            req.ClientCertificates.Add(certcer);

            req.AuthenticationLevel = System.Net.Security.AuthenticationLevel.None;

            Stream s = req.GetRequestStream();

            StreamWriter sw = new StreamWriter(s);

            string json = JsonConvert.SerializeObject(bankIdAuthResponse,
                        Newtonsoft.Json.Formatting.None,
                        new JsonSerializerSettings
                        {
                            NullValueHandling = NullValueHandling.Ignore
                        });

            sw.Write(json);

            sw.Close();

            s.Close();

            WebResponse rsp = req.GetResponse();

            StreamReader sr = new StreamReader(rsp.GetResponseStream());

            var result = sr.ReadToEnd();

            BankIdCollectDto collectResponse = JsonConvert.DeserializeObject<BankIdCollectDto>(result);

            if (collectResponse.status == "pending")
            {
                SleepBeforeRecursion(requestTimeStamp);

                return CollectRequest(bankIdAuthResponse);
            }

            return collectResponse;
        }

        private void SleepBeforeRecursion(DateTime requestTimeStamp)
        {
            TimeSpan requestTimeTotal = DateTime.Now - requestTimeStamp;
            int ms = (int)requestTimeTotal.TotalMilliseconds;

            if (ms < 2000)
            {
                int msRemaining = 2000 - ms;
                Thread.Sleep(msRemaining);
            }
        }
    }
}