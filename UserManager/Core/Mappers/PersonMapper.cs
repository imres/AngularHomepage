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
using UserManager.Core.Mappers.ToEntity;

namespace UserManager.Core.Mappers.ToEntity
{
    public class PersonMapper
    {
        public virtual Person DtoToEntityMapping(PersonDTO personDTO)
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<PersonDTO, Person>();
            });
            IMapper mapper = config.CreateMapper();

            return mapper.Map<PersonDTO, Person>(personDTO);
        }

        public virtual PersonDTO EntityToDtoMapping(Person person)
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<Person, PersonDTO>();
            });
            IMapper mapper = config.CreateMapper();

            return mapper.Map<Person, PersonDTO>(person);
        }
    }
}