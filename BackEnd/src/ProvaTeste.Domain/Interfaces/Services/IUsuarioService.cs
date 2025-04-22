using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using ProvaTeste.Domain.Entities;
using ProvaTeste.Domain.Utils;

namespace ProvaTeste.Domain.Interfaces.Services
{
    public interface IUsuarioService 
    {
        Task<int> Cadastrar(string usuario, int? userId);
        Task<string?> ObterPorId(int id, int? pessoaId);
        Task<PaginatedResult<string>> ListarUsuarios(Expression<Func<string, bool>>? filter = null, int page = 1, int pageSize = 10);
        Task ResetSenha(string usuario);
        Task GravaCodigoConfirmacao(string usuario);
        Task<string?> BuscarCodigoConfirmacaoPorEmail(string email);
        Task<List<string>> ObterTodos(int? empresaId);
        Task DefinirSenha(string usuario, string novaSenha);
        Task Update(string usuario, int? userId);
    }
}
