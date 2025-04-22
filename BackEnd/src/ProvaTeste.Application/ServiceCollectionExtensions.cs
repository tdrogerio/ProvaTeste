using Microsoft.Extensions.DependencyInjection;
using ProvaTeste.Application.Services;
using ProvaTeste.Domain.Interfaces.Services;
using System;

namespace ProvaTeste.Application
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            return services
                .AddTransient(typeof(IBaseService<,>), typeof(BaseService<,>))
                .AddTransient<IClientService, ClientService>();
        }
    }
}
