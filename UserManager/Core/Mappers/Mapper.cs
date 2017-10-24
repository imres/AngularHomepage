﻿using AutoMapper;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UserManager.DTO;

namespace UserManager.Core.Mappers
{
    public abstract class Mapper
    {
        //public Invitation DtoToEntityMapping(InvitationDTO invitationDTO)
        //{
        //    var config = new MapperConfiguration(cfg => {
        //        cfg.CreateMap<InvitationDTO, Invitation>();
        //    });
        //    IMapper mapper = config.CreateMapper();

        //    return mapper.Map<InvitationDTO, Invitation>(invitationDTO);
        //}

        public T2 DtoToEntityMapping<T1, T2>(T1 DTO)
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<T1, T2>();
            });
            IMapper mapper = config.CreateMapper();

            return mapper.Map<T1, T2>(DTO);
        }

        public T1 EntityToDtoMapping<T2, T1>(T2 entity)
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<T2, T1>();
            });
            IMapper mapper = config.CreateMapper();

            return mapper.Map<T2, T1>(entity);
        }

        public IEnumerable<InvitationDTO> EntityToDtoMappingCollection(IEnumerable<Invitation> invitation)
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<Invitation, InvitationDTO>();
            });
            IMapper mapper = config.CreateMapper();

            return mapper.Map<IEnumerable<Invitation>, IEnumerable<InvitationDTO>>(invitation);
        }

        public int GetMaxInteger<TEntity>(Func<TEntity, int> condition) where TEntity : class
        {
            using (var db = new masterEntities())
            {
                var context = db.Set<TEntity>();
                var maxValue = context.Any() ? context.Max(condition) + 1 : 0;

                return maxValue;
            };
        }
    }
}