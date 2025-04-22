using Microsoft.EntityFrameworkCore;
using ProvaTeste.Infrastructure.Persistence.DbContexts;

namespace ProvaTeste.Test
{
    internal class ContreteDbContextOptions : DbContextOptions
    {
        public override Type ContextType => typeof(ProvaTesteDbContext);

        public override DbContextOptions WithExtension<TExtension>(TExtension extension)
        {
            return this;
        }
    }
}
