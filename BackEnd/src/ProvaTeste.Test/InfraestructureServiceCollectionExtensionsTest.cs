using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ProvaTeste.Domain.Entities;
using ProvaTeste.Domain.Interfaces.Repositories;
using ProvaTeste.Domain.Interfaces.Services;
using ProvaTeste.Infrastructure;
using ProvaTeste.Infrastructure.Persistence.DbContexts;
using Moq;
using Xunit;

namespace ProvaTeste.Test
{
    public class InfraestructureServiceCollectionExtensionsTest
    {
        [Fact]
        public void RegisterRepositories_Should_RegisterBaseRepository()
        {
            // Act
            var provider = new ServiceCollection()
                .AddInfrastructure()
                .BuildServiceProvider();

            // Assert
            _ = provider.GetRequiredService<ITokenService>();
            _ = provider.GetRequiredService<ISecurityHashService>();
            _ = provider.GetRequiredService<ProvaTesteDbContext>();
        }
    }
}
