using AutoMapper;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using UserManager.DTO;

namespace UserManager.Models
{
    public class AutoMapperProfile : Profile
    {

       public AutoMapperProfile()
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<Person, PersonDTO>();
                cfg.CreateMap<PersonDTO, Person>();
            });
            IMapper mapper = config.CreateMapper();
        }


    }
}