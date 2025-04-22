using ProvaTeste.Domain.Entities;
using System.Threading.Tasks;

namespace ProvaTeste.Domain.Interfaces.Repositories
{
    public interface ILogLoginRepository 
    {
        Task RegistrarLogin(int usuarioId);
    }
} 