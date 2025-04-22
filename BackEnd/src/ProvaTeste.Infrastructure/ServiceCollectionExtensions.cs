using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace ProvaTeste.Infrastructure
{
    using Domain.Interfaces.Repositories;
    using Persistence.DbContexts;
    using ProvaTeste.Domain.Interfaces.Services;
    using ProvaTeste.Infrastructure.Services;
    using System;
    using ProvaTeste.Infrastructure.Repositories;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            return services
                .RegisterServices()
                .RegisterRepositories()
                .RegisterDbContext();
        }

        private static IServiceCollection RegisterServices(this IServiceCollection services)
        {
            return services
                .AddTransient<ITokenService, TokenJwtService>()
                .AddTransient<ISecurityHashService, SecurityHashSha512Service>();
        }

        private static IServiceCollection RegisterRepositories(this IServiceCollection services)
        {
            return services
                .AddTransient(typeof(IBaseRepository<,>), typeof(BaseRepository<,>))
                //.AddTransient<IVeiculoRepository, VeiculoRepository>()
                ; 
        }

        private static IServiceCollection RegisterDbContext(this IServiceCollection services)
        {
            return services.AddDbContext<ProvaTesteDbContext>(options => options.UseSqlServer(Environment.GetEnvironmentVariable("SQLCONNSTR_AZURE_SQL_CONNECTIONSTRING")));
        }
    }
}
