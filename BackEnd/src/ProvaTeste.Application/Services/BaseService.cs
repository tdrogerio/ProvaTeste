using ProvaTeste.Domain.Entities;
using ProvaTeste.Domain.Exceptions;
using ProvaTeste.Domain.Interfaces.Repositories;
using ProvaTeste.Domain.Interfaces.Services;
using ProvaTeste.Domain.Utils;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ProvaTeste.Application.Services
{
    public class BaseService<TEntity, TId>(IBaseRepository<TEntity, TId> repository) : IBaseService<TEntity, TId>
        where TEntity : BaseEntity<TId>
        where TId : notnull
    {
        public async Task Add(TEntity objeto, int? userId = null)
        {
            await repository.Add(objeto, userId);
        }

        public async Task Delete(TEntity objeto, int? empresaId = null, int? userId = null)
        {
            if (objeto.Id == null || objeto.Id.Equals(default(TId)))
            {
                throw new DomainException(new() { { "Id", "O valor do ID é inválido" } });
            }

            var entity = await GetById(objeto.Id, empresaId);
            if (entity == null)
            {
                throw new DomainException(new() { { "Id", "Entidade não encontrada para exclusão" } });
            }

            await repository.Delete(objeto, empresaId, userId);
        }

        public async Task<TEntity?> GetById(TId id, int? empresaId = null)
        {
            var entity = await repository.GetById(id, empresaId);
            if (entity == null)
            {
                throw new DomainException(new() { { "Id", "Entidade não encontrada" } });
            }
            return entity;
        }

        public async Task<PaginatedResult<TEntity>> List(Expression<Func<TEntity, bool>>? filter = null, int page = 1, int pageSize = 10)
        {
            var items = await repository.List(filter, page, pageSize);
            var total = await repository.Count(filter);
            
            return new PaginatedResult<TEntity>(items, total, page, pageSize);
        }

        public async Task Update(TEntity objeto, int? empresaId = null, int? userId = null)
        {
            if (objeto.Id == null || objeto.Id.Equals(default(TId)))
            {
                throw new DomainException(new() { { "Id", "O valor do ID é inválido" } });
            }

            var entity = await GetById(objeto.Id, empresaId);
            if (entity == null)
            {
                throw new DomainException(new() { { "Id", "Entidade não encontrada para atualização" } });
            }

            await repository.Update(objeto, empresaId, userId);
        }
    }
}
