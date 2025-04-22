using ProvaTeste.Domain.Entities;
using ProvaTeste.Domain.Utils;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ProvaTeste.Domain.Interfaces.Services
{
    public interface IBaseService<TEntity, TId>
        where TEntity : BaseEntity<TId>
        where TId : notnull
    {
        Task Add(TEntity objeto, int? userId = null);
        Task Update(TEntity objeto, int? empresaId = null, int? userId = null);
        Task Delete(TEntity objeto, int? empresaId = null, int? userId = null);
        Task<TEntity?> GetById(TId id, int? empresaId = null);
        Task<PaginatedResult<TEntity>> List(Expression<Func<TEntity, bool>>? filter = null, int page = 1, int pageSize = 10);
    }
}
