using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using UserManager.Core.Interfaces;

namespace UserManager.Core.Repositories
{
    public class Repository : IRepository
    {
        /// <summary>
        /// Get list of rows matching expression
        /// </summary>
        /// <typeparam name="TEntity">Source entity</typeparam>
        /// <typeparam name="TEntityDto">Destination entity</typeparam>
        public IEnumerable<TEntityDto> ListByQuery<TEntity, TEntityDto>(Expression<Func<TEntity, bool>> query) where TEntity : class
        {
            using (var context = new masterEntities())
            {
                var dbSet = context.Set<TEntity>();

                var entity = dbSet.Where(query).ToArray();

                var result = Mapper.Map<IEnumerable<TEntityDto>>(entity);

                return result;
            }
        }
    }
}