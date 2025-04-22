using System.Collections.Generic;
using System.Threading.Tasks;
using ProvaTeste.Domain.Entities;

namespace ProvaTeste.Domain.Interfaces.Services
{
    public interface IContratoItemAnexoService : IBaseService<ContratoItemAnexo, int>
    {
        Task Cadastrar(ContratoItemAnexo? contratoItemAnexo);
        Task Editar(ContratoItemAnexo? contratoItemAnexo);
        Task Excluir(ContratoItemAnexo? contratoItemAnexo);
        Task<List<ContratoItemAnexo>> ObterTodos();
        Task<List<ContratoItemAnexo>> ObterPorContratoItemId(int contratoItemId);
    }
} 