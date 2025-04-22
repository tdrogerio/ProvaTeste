using ProvaTeste.Infrastructure.Persistence.DbContexts;
using Xunit;

namespace ProvaTeste.Test
{
    public class InfraestructureProvaTesteDbContextTest
    {
        [Fact]
        public void CREATE_ProvaTeste_DBCONTEXT_SUCCESS()
        {
            // Arrage
            var options = new ContreteDbContextOptions();
            // Act
            // Assert
            var context = new ProvaTesteDbContext(options);
        }

    }
}
