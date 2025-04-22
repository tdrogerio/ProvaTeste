using ProvaTeste.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using Teste;

namespace ProvaTeste.Domain.Interfaces.Services
{
    public interface IClientService : IBaseService<Client, int>
    {
        Task Cadastrar(Client client);
        Task Editar(Client client);
        Task Excluir(Client client);
        Task<List<Client>> ObterTodos();
        Task<Client?> ObterPorId(int id);
    }
}
