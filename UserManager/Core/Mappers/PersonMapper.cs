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

namespace UserManager.Core.Mappers
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
                cfg.CreateMap<Person, PersonDTO>().ForMember(x => x.Password, opt => opt.Ignore());
                /*.ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address))
                .ForMember(dest => dest.Alias, opt => opt.MapFrom(src => src.Alias))
                .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.DisplayName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.PersonId, opt => opt.MapFrom(src => src.PersonId))
                .ForMember(dest => dest.PhoneMobile, opt => opt.MapFrom(src => src.PhoneMobile))
                .ForMember(dest => dest.PostalCode, opt => opt.MapFrom(src => src.PostalCode))
                .ForMember(dest => dest.RegisterDate, opt => opt.MapFrom(src => src.RegisterDate))
                .ForMember(dest => dest.Token, opt => opt.MapFrom(src => src.Token))
                .ForMember(dest => dest.UserRights, opt => opt.MapFrom(src => src.UserRights))*/
            });
            IMapper mapper = config.CreateMapper();

            return mapper.Map<Person, PersonDTO>(person);
        }
    }
}