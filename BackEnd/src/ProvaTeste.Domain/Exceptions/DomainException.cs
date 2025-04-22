using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace ProvaTeste.Domain.Exceptions
{
    public class DomainException : Exception
    {
        public IDictionary<string, string>? Requeriments { get; }

        public DomainException(Dictionary<string, string> requeriments) : base()
        {
            Requeriments = requeriments;
        }

    }
}