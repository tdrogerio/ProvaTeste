using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Teste;

namespace ProvaTeste.Infrastructure.Persistence.Configurations
{
    public class AddressConfiguration : IEntityTypeConfiguration<Address>
    {
        public void Configure(EntityTypeBuilder<Address> builder)
        {
            builder.ToTable("Address");

            builder.HasKey(a => a.Cep);

            builder.Property(a => a.Cep)
                .IsRequired()
                .HasMaxLength(8);

            builder.Property(a => a.Street)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(a => a.Number)
                .IsRequired()
                .HasMaxLength(10);

            builder.Property(a => a.Neighborhood)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(a => a.City)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(a => a.State)
                .IsRequired()
                .HasMaxLength(2);

            builder.Property(a => a.Complement)
                .HasMaxLength(100);
        }
    }
}
