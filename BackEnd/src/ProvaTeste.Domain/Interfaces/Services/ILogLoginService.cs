using System.Threading.Tasks;

namespace ProvaTeste.Domain.Interfaces.Services
{
    public interface ILogLoginService 
    {
        Task RegistrarLogin(int usuarioId);
    }
} 