using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.Entity;
using System.Web;
using MySql.Data.MySqlClient;
using UserManager.Models;
using AutoMapper;
using System.Net.Http;
using System.Web.Http;
using System.Security.Cryptography;
using UserManager.DTO;
using UserManager.Core.Enums;
using UserManager.Core.Mappers;

namespace UserManager.Controllers
{
    public class CRUD
    {
        public PersonMapper _DtoToPerson = new PersonMapper();

        //Remove Link By Id
        public void RemoveLinkById(int Id)
        {
            using (masterEntities context = new masterEntities())
            {
                var linkToRemove = context.UserLinks.Where(x => x.Id == Id).FirstOrDefault();

                if(linkToRemove != null)
                {
                    context.UserLinks.Remove(linkToRemove);
                    context.SaveChanges();
                }
            }
        }
        //---

        public List<UserLinks> GetUserLinks(int Id)
        {
            var allLinks = new List<UserLinks>();
            using (masterEntities context = new masterEntities())
            {
                var links = context.UserLinks.Where(x => x.UserId == Id);

                foreach (var link in links)
                {
                    allLinks.Add(link);
                }

                return allLinks;
            }
        }

        public List<Users> GetAllUsers()
        {
            List<Users> allUsers = new List<Users>();

            using (masterEntities context = new masterEntities())
            {
                var users = context.Users;

                foreach (var user in users)
                {
                    allUsers.Add(user);
                }

                return allUsers;
            }
        }
            

        public void addNewLink(UserLinksDTO UserLink)
        {
            using (masterEntities context = new masterEntities())
            {
                var newLink = context.UserLinks.Add(new UserLinks
                {
                    Id = context.UserLinks.DefaultIfEmpty().Max(x => x == null ? 0 : x.Id + 1),
                    Link = UserLink.Link,
                    CachedImage = null,
                    UserId = UserLink.UserId,
                    Title = UserLink.Title
                });

                context.SaveChanges();
            }
        }
        
        /*public string CacheImage(int Id, string ImageLink)
        {
            using (masterEntities context = new masterEntities())
            {
                var link = context.UserLinks.Where(x => x.Id == Id);
                var base64Image = Base64Encode(ImageLink);
                link.FirstOrDefault().CachedImage = base64Image;

                context.SaveChanges();
                return base64Image;
            }
            
        }*/

        public List<User> Test()
        {
            var test = new User()
            {
                username = "Pontus Wikberg",
                password = "testpass123",
                email = "pontuswikberg_@hotmail.com"
            };

            var userList = new List<User>();
            userList.Add(test);
            
            return userList;
        }

    }
}
 