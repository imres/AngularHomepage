using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace UserManager.Core.Services
{
    public static class MailService
    {
        public static void SendEmail()
        {
            var pontusmail = "";

            string mailBodyhtml =
                "<p>SMTP fungerar!!</p>";
            var msg = new MailMessage(pontusmail, pontusmail, "Hello", mailBodyhtml);
            msg.To.Add(new MailAddress(pontusmail));
            msg.IsBodyHtml = true;
            var smtpClient = new SmtpClient("smtp.gmail.com", 587); //if your from email address is "from@hotmail.com" then host should be "smtp.hotmail.com"
            smtpClient.UseDefaultCredentials = true;
            smtpClient.Credentials = new NetworkCredential(pontusmail, "password");
            smtpClient.EnableSsl = true;
            smtpClient.Send(msg);
        }
    }
}