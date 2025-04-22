using Microsoft.EntityFrameworkCore;
using ProvaTeste.Domain.Entities;
using ProvaTeste.Infrastructure.Configurations;
using ProvaTeste.Infrastructure.Persistence.Configurations;

namespace ProvaTeste.Infrastructure.Persistence.DbContexts
{
    public class ProvaTesteDbContext(DbContextOptions options) : DbContext(options)
    {
        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            base.ConfigureConventions(configurationBuilder);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ClientConfiguration())
                        .ApplyConfiguration(new AddressConfiguration());

            base.OnModelCreating(modelBuilder);
        }
    }
}