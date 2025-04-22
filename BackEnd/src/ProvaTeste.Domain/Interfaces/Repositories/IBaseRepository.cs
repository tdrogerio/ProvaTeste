using System.Collections.Generic;
using System.Threading.Tasks;
using ProvaTeste.Domain.Entities;
using System.Linq.Expressions;
using System;

namespace ProvaTeste.Domain.Interfaces.Repositories
{
    public interface IBaseRepository<TEntity, TId>
        where TEntity : BaseEntity<TId>
        where TId : notnull
    {
        Task Add(TEntity objeto, int? userId = null);
        Task Update(TEntity objeto, int? empresaId = null, int? userId = null);
        Task Delete(TEntity objeto, int? empresaId = null, int? userId = null);
        Task<TEntity?> GetById(TId id, int? empresaId = null);
        Task<List<TEntity>> List(Expression<Func<TEntity, bool>>? filter = null, int page = 1, int pageSize = 10);
        Task<int> Count(Expression<Func<TEntity, bool>>? filter = null);
    }
}
