using AutoMapper;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UserManager.DTO;

namespace UserManager.Core.Mappers
{
    public abstract class CustomMapper
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

        public IEnumerable<T2> EntityToDtoMappingCollection<T1, T2>(IEnumerable<T1> entity)
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<T1, T2>();
            });
            IMapper mapper = config.CreateMapper();

            return mapper.Map<IEnumerable<T1>, IEnumerable<T2>>(entity);
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