using ProvaTeste.Domain.Entities;
using System;

namespace Teste
{
    public class Client : BaseEntity<int>
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Document { get; set; } // CPF or CNPJ
        public ClientType ClientType { get; set; }
        public string? BirthDate { get; set; } // Only for individuals
        public string? Ie { get; set; } // Only for business
        public bool IeExempt { get; set; } // Only for business
        public string Phone { get; set; }
        public string Email { get; set; }
        public Address Address { get; set; }
        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }
    }
}
