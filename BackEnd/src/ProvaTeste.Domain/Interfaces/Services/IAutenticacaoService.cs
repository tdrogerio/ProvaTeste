using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProvaTeste.Domain.Interfaces.Services
{
    public interface IAutenticacaoService
    {
        Task<string> Entrar(string? nome, string? senha);
    }
}
