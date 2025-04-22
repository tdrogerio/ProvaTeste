using System;

namespace ProvaTeste.Domain.Entities
{
    public abstract class BaseEntity<TId> where TId : notnull
    {
        public TId Id { get; set; }
        public bool Deleted { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}