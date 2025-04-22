using ProvaTeste.Domain.Entities;
using ProvaTeste.Domain.Interfaces.Repositories;
using ProvaTeste.Domain.Interfaces.Services;
using System.Threading.Tasks;

namespace ProvaTeste.Application.Services
{
    public class LogLoginService : ILogLoginService
    {
        private readonly ILogLoginRepository _logLoginRepository;

        public LogLoginService(
            ILogLoginRepository logLoginRepository) 
        {
            _logLoginRepository = logLoginRepository;
        }

        public async Task RegistrarLogin(int usuarioId)
        {
            await _logLoginRepository.RegistrarLogin(usuarioId);
        }
    }
} 