using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using ProvaTeste.Domain.Entities;
using ProvaTeste.Domain.Interfaces.Repositories;
using ProvaTeste.Infrastructure.Persistence.DbContexts;

namespace ProvaTeste.Infrastructure.Repositories
{
    public class LogLoginRepository(ProvaTesteDbContext context) : ILogLoginRepository
    {

        public Task Add(LogLogin objeto)
        {
            throw new NotImplementedException();
        }

        public Task<int> Count(Expression<Func<LogLogin, bool>>? filter = null)
        {
            throw new NotImplementedException();
        }

        public Task Delete(LogLogin objeto, int? clienteId = null)
        {
            throw new NotImplementedException();
        }

        public Task<LogLogin?> GetById(int id, int? clienteId = null)
        {
            throw new NotImplementedException();
        }

        public Task<List<LogLogin>> List(Expression<Func<LogLogin, bool>>? filter = null, int page = 1, int pageSize = 10)
        {
            throw new NotImplementedException();
        }



        public async Task RegistrarLogin(int usuarioId)
        {
            var logLogin = new LogLogin
            {
                UsuarioId = usuarioId,
                DataHoraLogin = DateTime.UtcNow
            };

            await context.Set<LogLogin>().AddAsync(logLogin);
            await context.SaveChangesAsync();
        }

        public Task Update(LogLogin objeto, int? clienteId = null)
        {
            throw new NotImplementedException();
        }
    }
}