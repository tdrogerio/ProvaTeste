using ProvaTeste.Test.Util.Interfaces;
using System.Text.Json;

namespace ProvaTeste.Test.Util;
public class WorkerOptions : IWorkerOptions
{
    public ISerializer Serializer { get; } = new SystemTextJsonSerializer(new JsonSerializerOptions());
}
