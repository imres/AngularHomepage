using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using UserManager.Core.Repositories;
using UserManager.DTO;
using UserManager.Models;
using Http = System.Net.WebRequestMethods.Http;

namespace UserManager.Controllers
{
    //[EnableCors(origins: "*", headers: "*", methods: "*", exposedHeaders: "X-Custom-Header")]
    //[RoutePrefix("api/books")]
    public class UserController : ApiController
    {
        private CRUD _crud = new CRUD();
        private PersonRepository _PersonRepository = new PersonRepository();
        //private Scrape _scrape = new Scrape();

        //[Route("TSPRoute")]
        [ActionName("Register")]
        [HttpPost]
        public HttpResponseMessage Register(PersonDTO User)
        {
            using (HttpClient http = new HttpClient())
            {
                this.Request.RequestUri = new Uri("http://localhost:65192");

                if (this.Request.Method == HttpMethod.Get)
                {
                    this.Request.Content = null;
                }
                
                _PersonRepository.AddPerson(User);

                return Request.CreateResponse(HttpStatusCode.OK, Configuration.Formatters.JsonFormatter);
            }
        }

        [ActionName("Auth")]
        [HttpPost]
        public HttpResponseMessage Auth(PersonDTO User)
        {
            using (HttpClient http = new HttpClient())
            {
                this.Request.RequestUri = new Uri("http://localhost:65192");

                if (this.Request.Method == HttpMethod.Get)
                {
                    this.Request.Content = null;
                }

                User = _PersonRepository.Authenticate(User);

                return User?.Token != null ? Request.CreateResponse(HttpStatusCode.OK, User) : Request.CreateResponse(HttpStatusCode.Forbidden, User);
            }
        }

        // GET: api/User/5
        /*public HttpResponseMessage Get(int id)
        {
            
        }*/

        // POST: api/User
        // public void Post([FromBody]string value)
        // {
        // }

        // PUT: api/User/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/User/5
        public void Delete(int id)
        {
        }

        // GET: api/User
        /*[ActionName("GetById")]
        [HttpGet]
        public HttpResponseMessage GetImagesById(int Id)
        {
            //Get all links from current user
            var userLinks = _crud.GetUserLinks(Id);
            List<ImageLink> scrapedImages = new List<ImageLink>();

            //Iterate every child to set Image, link and title
            foreach (var item in userLinks)
            {
                //Use cached image first, else try to scrape
                var linkImage = item.CachedImage == null ? _scrape.ScrapeUrl(item.Link).FirstOrDefault() : item.CachedImage;

                var _object = new ImageLink() { Image = linkImage, Link = item.Link, Title = item.Title, Id = item.Id};

                //Set placeholder image if scrape returned null
                if(_object.Image == null)
                {
                    _object.Image = "img/alt-image.png";
                }

                scrapedImages.Add(_object);
            }

            return Request.CreateResponse(HttpStatusCode.OK, scrapedImages);

        }

        [ActionName("RemoveLinkById")]
        [HttpPost]
        public HttpResponseMessage RemoveLinkById(int Id)
        {
            using (HttpClient http = new HttpClient())
            {
                this.Request.RequestUri = new Uri("http://localhost:65192");

                if (this.Request.Method == HttpMethod.Get)
                {
                    this.Request.Content = null;
                }
                
                _crud.RemoveLinkById(Id);

                //return Request.CreateResponse(System.Net.HttpStatusCode.Created, createdUser);
                return Request.CreateResponse(HttpStatusCode.OK, Configuration.Formatters.JsonFormatter);
            }
        }*/

        /*[ActionName("AddLink")]
        [HttpPost]
        public HttpResponseMessage AddLink(UserLinksDTO UserLink)
        {
            using (HttpClient http = new HttpClient())
            {
                this.Request.RequestUri = new Uri("http://localhost:65192");

                if (this.Request.Method == HttpMethod.Get)
                {
                    this.Request.Content = null;
                }

                if(UserLink.UserId != 0)
                {
                    _crud.addNewLink(UserLink);
                }

                //return Request.CreateResponse(System.Net.HttpStatusCode.Created, createdUser);
                return Request.CreateResponse(HttpStatusCode.OK, Configuration.Formatters.JsonFormatter);
            }
        }*/


    }
}
