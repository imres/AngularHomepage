using AutoMapper;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using UserManager.Core.Interfaces;
using UserManager.DTO;

namespace UserManager.Core.Services
{
    public class UserService : IUserService
    {
        private UnitOfWork unitOfWork = new UnitOfWork(new masterEntities());

        public PersonDTO UpdateUser(PersonForUpdateDTO user)
        {

            var entity = unitOfWork.Person.Find(x => x.PersonId == user.PersonId).FirstOrDefault();

            entity.Email = user.Email;
            entity.Password = user.Password.Length > 0 ? CryptographyService.Encrypt(user.Password) : entity.Password;
            entity.PhoneMobile = user.PhoneMobile;

            unitOfWork.Save();

            var dto = Mapper.Map<PersonDTO>(entity);

            return dto;
        }

        private void ValidateUser(PersonDTO user)
        {
            //var entity = unitOfWork.Person.Find(x => x.Email == user.Email);

            //if (entity.Any())
            //    throw new InvalidDataException("Email wrong");
        }
    }
}