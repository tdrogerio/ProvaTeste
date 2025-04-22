using System.Collections.Generic;
using System.Threading.Tasks;
using ProvaTeste.Domain.Entities;
using Teste;

namespace ProvaTeste.Domain.Interfaces.Repositories
{
    public interface IClientRepository
    {
        Task<List<Client>> ObterTodos();
        Task<Client?> ObterPorId(int id);
        Task<List<Client>> ObterPorFiltro(string filtro);
    }
}
