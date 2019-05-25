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
                cfg.CreateMap<person, PersonDTO>();
                cfg.CreateMap<PersonDTO, person>();
            });
            IMapper mapper = config.CreateMapper();
        }


    }
}