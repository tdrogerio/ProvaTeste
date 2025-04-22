using ProvaTeste.Domain.Entities;
using ProvaTeste.Domain.Interfaces.Repositories;
using ProvaTeste.Domain.Interfaces.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProvaTeste.Application.Services
{
    public class ContratoItemAnexoService(
        IBaseRepository<ContratoItemAnexo, int> repository,
        IContratoItemAnexoRepository contratoItemAnexoRepository) : 
        BaseService<ContratoItemAnexo, int>(repository), IContratoItemAnexoService
    {
        public async Task Cadastrar(ContratoItemAnexo? contratoItemAnexo)
        {
            await repository.Add(contratoItemAnexo);
        }

        public async Task Editar(ContratoItemAnexo? contratoItemAnexo)
        {
            await repository.Update(contratoItemAnexo);
        }

        public async Task Excluir(ContratoItemAnexo? contratoItemAnexo)
        {
            await repository.Delete(contratoItemAnexo);
        }

        public async Task<List<ContratoItemAnexo>> ObterTodos()
        {
            return await contratoItemAnexoRepository.ObterTodos();
        }

        public async Task<List<ContratoItemAnexo>> ObterPorContratoItemId(int contratoItemId)
        {
            return await contratoItemAnexoRepository.ObterPorContratoItemId(contratoItemId);
        }
    }
} 