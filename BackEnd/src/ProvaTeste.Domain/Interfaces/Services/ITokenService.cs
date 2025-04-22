using ProvaTeste.Domain.Entities;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ProvaTeste.Domain.Interfaces.Services
{
    public interface ITokenService 
    {
        Task<string> Autenticar(string? email);

        ClaimsPrincipal ClaimsPrincipalObter(string? token);
    }
}
