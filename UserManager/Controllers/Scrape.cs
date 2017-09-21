using HtmlAgilityPack;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;

namespace UserManager.Controllers
{
    public class Scrape
    {
        public List<string> ScrapeUrl(string UrlValue)
        {
            using (var webClient = new System.Net.WebClient())
            {
                try
                {
                    var jsonResponse = webClient.DownloadString("http://icons.better-idea.org/allicons.json?pretty=true&url=" + UrlValue);

                    // Now parse with JSON.Net
                    dynamic data = Newtonsoft.Json.JsonConvert.DeserializeObject(jsonResponse);
                    var jObj = (JObject)data;

                    var images = jObj.SelectToken("icons").Select(x => (string)x["url"]).ToList();

                    return images;
                }catch
                {
                    var test = new List<string>();
                    test.Add(null);
                    return test;
                }
            }

            /*try
            {
                HttpWebRequest request = HttpWebRequest.Create(UrlValue) as HttpWebRequest;
                HttpWebResponse response = request.GetResponse() as HttpWebResponse;

                var ResponseStream = response.GetResponseStream();

                HtmlDocument document = new HtmlDocument();
                document.Load(ResponseStream);
                string imgSrc = string.Empty;
                var ogMeta = document.DocumentNode.SelectNodes("//meta[@property]");
                //Check if contain Open graph element 
                if (ogMeta != null)
                {
                    var ogImage = document.DocumentNode.SelectNodes("//meta[@property]").Where(x => x.Attributes["property"].Value == "og:image:url");
                    if (ogImage.Count() > 0) //check og:image found 
                        return ogImage.FirstOrDefault().Attributes["content"].Value;
                    else  //return some images 
                        throw new ArgumentNullException();
                        //return GetImages(document.DocumentNode.SelectNodes("//img"));
                }
                else
                {
                    throw new ArgumentNullException();
                }



            }
            catch
            {
                return null;
            }*/
        }


        private string GetImages(HtmlNodeCollection DOM)
        {
            StringBuilder Images = new StringBuilder();
            if (DOM != null)
            {
                foreach (var img in DOM)
                {
                    Images.AppendFormat("<li>");
                    Images.AppendFormat(img.OuterHtml);
                    Images.AppendFormat("</li>");

                }
            }
            return Images.ToString();
        }



    }
}