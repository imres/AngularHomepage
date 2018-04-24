using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace UserManager.Core.Interfaces
{
    public interface IRepository
    {
        IEnumerable<TEntityDto> ListByQuery<TEntity, TEntityDto>(Expression<Func<TEntity, bool>> query) where TEntity : class;
    }
}