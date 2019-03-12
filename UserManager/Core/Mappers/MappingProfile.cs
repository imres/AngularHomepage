﻿using System;
using System.Collections;
using System.Linq;
using System.Web;
using AutoMapper;
using UserManager.DTO;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace UserManager.Core.Mappers
{
    public class MappingProfile
    {
        public MappingProfile()
        {
        }

        public static void InitializeMappings()
        {
            Mapper.Initialize(cfg => {
                cfg.CreateMap<Invitation, InvitationDTO>();
                cfg.CreateMap<InvitationDTO, Invitation>();

                cfg.CreateMap<Consignment, ConsignmentDTO>();
                cfg.CreateMap<ConsignmentDTO, Consignment>();

                cfg.CreateMap<ActiveConsignment, ActiveConsignmentDTO>()
                    .ForMember(x => x.LastSeenCity, opt => opt.Ignore())
                    .ForMember(x => x.LastSeenTimeStamp, opt => opt.Ignore())
                    .ForMember(x => x.Consignor, opt => opt.Ignore())
                    .ForMember(x => x.Consignee, opt => opt.Ignore())
                    .ForMember(x => x.DropOffDate, opt => opt.Ignore())
                    .ForMember(x => x.DropOffLocation, opt => opt.Ignore())
                    .IgnoreAllPropertiesWithAnInaccessibleSetter();
                cfg.CreateMap<ActiveConsignmentDTO, ActiveConsignment>()
                    .ForSourceMember(x => x.LastSeenCity, opt => opt.Ignore())
                    .ForSourceMember(x => x.LastSeenTimeStamp, opt => opt.Ignore())
                    .ForSourceMember(x => x.Consignor, opt => opt.Ignore())
                    .ForSourceMember(x => x.Consignee, opt => opt.Ignore())
                    .ForSourceMember(x => x.DropOffDate, opt => opt.Ignore())
                    .ForSourceMember(x => x.DropOffLocation, opt => opt.Ignore())
                    ;

                cfg.CreateMap<Person, PersonDTO>();
                cfg.CreateMap<PersonDTO, Person>().ForMember(x => x.Password, opt => opt.Ignore());

                cfg.CreateMap<Person, PersonForUpdateDTO>();
                cfg.CreateMap<PersonForUpdateDTO, Person>();

                cfg.CreateMap<BankIdPersonDTO, Person>()
                    .ForMember(x => x.Address, opt => opt.Ignore())
                    .ForMember(x => x.Alias, opt => opt.Ignore())
                    .ForMember(x => x.Password, opt => opt.Ignore())
                    .ForMember(x => x.PhoneMobile, opt => opt.Ignore())
                    .ForMember(x => x.PostalCode, opt => opt.Ignore())
                    .ForMember(x => x.City, opt => opt.Ignore())
                    .ForMember(x => x.Token, opt => opt.Ignore())
                    .ForMember(x => x.Email, opt => opt.Ignore())
                    ;
            });

            Mapper.AssertConfigurationIsValid();
        }

        public async Task<T> ParseJsonToObjectAsync<T>(string jsonValue)
        {
            var obj = await Task.Factory.StartNew(() => JsonConvert.DeserializeObject<T>(jsonValue));
            return obj;
        }
    }
    
}