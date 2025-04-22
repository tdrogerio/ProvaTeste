using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProvaTeste.Domain.Entities;
using Teste;

namespace ProvaTeste.Infrastructure.Persistence.Configurations
{
    public class ClientConfiguration : IEntityTypeConfiguration<Client>
    {
        public void Configure(EntityTypeBuilder<Client> builder)
        {
            builder.ToTable("Client");

            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(c => c.Document)
                .IsRequired()
                .HasMaxLength(14);

            builder.Property(c => c.Phone)
                .HasMaxLength(15);

            builder.Property(c => c.Email)
                .HasMaxLength(100);

            builder.HasOne(c => c.Address)
                .WithOne()
                .HasForeignKey<Client>(c => c.Id)
                .OnDelete(DeleteBehavior.Cascade);

            // Configuração adicional para navegação automática
            builder.Navigation(c => c.Address).AutoInclude();
        }
    }
}
