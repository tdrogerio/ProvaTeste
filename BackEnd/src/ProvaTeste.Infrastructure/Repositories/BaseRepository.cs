using System.Collections.Generic;
using System.Threading.Tasks;
using ProvaTeste.Domain.Interfaces.Repositories;
using ProvaTeste.Domain.Entities;
using ProvaTeste.Infrastructure.Persistence.DbContexts;
using System.Linq.Expressions;
using System;
using System.Linq;
using ProvaTeste.Domain.Exceptions;
using Microsoft.EntityFrameworkCore;
using ProvaTeste.Domain.Interfaces;
using ProvaTeste.Domain.Interfaces.Services;

namespace ProvaTeste.Infrastructure.Repositories
{
    public class BaseRepository<TEntity, TId>(ProvaTesteDbContext context) : IBaseRepository<TEntity, TId>
        where TEntity : BaseEntity<TId>
        where TId : notnull
    {
        public async Task Add(TEntity objeto, int? userId = null)
        {
            objeto.CreatedBy = userId;
            objeto.CreatedAt = DateTime.Now;
            
            await context.Set<TEntity>().AddAsync(objeto);
            await context.SaveChangesAsync();
        }

        public async Task Update(TEntity objeto, int? empresaId = null, int? userId = null)
        {
            if (objeto.Id == null || objeto.Id.Equals(default(TId)))
                throw new DomainException(new() { { "Id", $"O valor '{objeto.Id}' é inválido" } });

            var entity = await GetById(objeto.Id, empresaId);
            if (entity == null)
                throw new DomainException(new() { { "EmpresaId", "Acesso negado" } });

            objeto.UpdatedBy = userId;
            objeto.UpdatedAt = DateTime.Now;

            context.Set<TEntity>().Update(objeto);
            await context.SaveChangesAsync();
        }

        public async Task Delete(TEntity objeto, int? empresaId = null, int? userId = null)
        {
            if (objeto.Id == null || objeto.Id.Equals(default(TId)))
                throw new DomainException(new() { { "Id", $"O valor '{objeto.Id}' é inválido" } });

            var entity = await GetById(objeto.Id, empresaId);
            if (entity == null)
                throw new DomainException(new() { { "EmpresaId", "Acesso negado" } });

            objeto.Deleted = true;
            objeto.UpdatedBy = userId;
            objeto.UpdatedAt = DateTime.Now;

            context.Set<TEntity>().Update(objeto);
            await context.SaveChangesAsync();
        }

        public async Task<TEntity?> GetById(TId id, int? empresaId = null)
        {
            var query = context.Set<TEntity>().Where(e => !e.Deleted);

            if (empresaId.HasValue)
            {              
                var clienteIdProperty = typeof(TEntity).GetProperty("EmpresaId");
                if (clienteIdProperty != null)
                {
                    query = query.Where(e => EF.Property<object>(e, "EmpresaId") != null
                                          && EF.Property<object>(e, "EmpresaId").Equals(empresaId.Value));
                }
            }

            return await query.FirstOrDefaultAsync(e => e.Id.Equals(id));
        }

        public async Task<List<TEntity>> List(Expression<Func<TEntity, bool>>? filter = null, int page = 1, int pageSize = 10)
        {
            var query = context.Set<TEntity>().Where(e => !e.Deleted);          
            if (filter != null)
            {
                query = query.Where(filter);
            }

            return await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<int> Count(Expression<Func<TEntity, bool>>? filter = null)
        {
            var query = context.Set<TEntity>()
                .Where(e => !e.Deleted)
                .AsQueryable();

            if (filter != null)
                query = query.Where(filter);

            return await query.CountAsync();
        }
    }
}
