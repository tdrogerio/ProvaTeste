using System;

namespace ProvaTeste.Domain.Entities
{
    public sealed class LogLogin
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public DateTime DataHoraLogin { get; set; }
        
        // Propriedade de navegação
        public string Usuario { get; set; } = null!;
    }
} 