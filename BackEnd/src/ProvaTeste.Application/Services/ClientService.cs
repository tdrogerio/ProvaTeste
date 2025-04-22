using ProvaTeste.Domain.Entities;
using ProvaTeste.Domain.Exceptions;
using ProvaTeste.Domain.Interfaces.Repositories;
using ProvaTeste.Domain.Interfaces.Services;
using ProvaTeste.Domain.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Teste;

namespace ProvaTeste.Application.Services
{
    public class ClientService(
        IBaseRepository<Client, int> repository,
        IClientRepository clientRepository) :
        BaseService<Client, int>(repository), IClientService
    {
        public async Task Cadastrar(Client client)
        {
            await repository.Add(client);
        }

        public async Task Editar(Client client)
        {
            await repository.Update(client);
        }

        public async Task Excluir(Client client)
        {
            // Exemplo de validação adicional antes de excluir
            if (client.ClientType == ClientType.Business && string.IsNullOrWhiteSpace(client.Ie))
            {
                throw new DomainException(new Dictionary<string, string>
                {
                    { "Client", "Não é possível excluir um cliente empresarial sem IE (Inscrição Estadual)." }
                });
            }

            await repository.Delete(client);
        }

        public async Task<PaginatedResult<Client>> List(string? filter, int page = 1, int pageSize = 10)
        {
            Expression<Func<Client, bool>>? expressionFilter = null;

            if (!string.IsNullOrWhiteSpace(filter))
            {
                expressionFilter = f => f.Name.Contains(filter) ||
                                        f.Document.Contains(filter) ||
                                        f.Email.Contains(filter);
            }

            var items = await repository.List(expressionFilter, page, pageSize);
            var total = await repository.Count(expressionFilter);

            return new PaginatedResult<Client>(items, total, page, pageSize);
        }

        public async Task<List<Client>> ObterTodos()
        {
            return await clientRepository.ObterTodos();
        }

        public async Task<Client?> ObterPorId(int id)
        {
            return await clientRepository.ObterPorId(id);
        }

        public async Task<List<Client>> ObterPorFiltro(string filtro)
        {
            return await clientRepository.ObterPorFiltro(filtro);
        }
    }
}
