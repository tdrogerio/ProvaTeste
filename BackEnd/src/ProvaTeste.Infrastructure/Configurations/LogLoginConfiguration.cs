using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProvaTeste.Domain.Entities;

namespace ProvaTeste.Infrastructure.Configurations
{
    public class LogLoginConfiguration : IEntityTypeConfiguration<LogLogin>
    {
        public void Configure(EntityTypeBuilder<LogLogin> builder)
        {
            builder.ToTable("log_login");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.UsuarioId)
                .IsRequired();

            builder.Property(x => x.DataHoraLogin)
                .IsRequired();

            builder.HasOne(x => x.Usuario)
                .WithMany()
                .HasForeignKey(x => x.UsuarioId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
} 