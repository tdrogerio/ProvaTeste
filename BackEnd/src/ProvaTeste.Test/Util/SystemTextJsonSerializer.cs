using ProvaTeste.Test.Util.Interfaces;
using System.Text.Json;

namespace ProvaTeste.Test.Util;
public class SystemTextJsonSerializer : ISerializer
{
    private readonly JsonSerializerOptions _options;

    public SystemTextJsonSerializer(JsonSerializerOptions options)
    {
        _options = options ?? new JsonSerializerOptions();
    }

    public async ValueTask<T?> DeserializeAsync<T>(Stream utf8Json, CancellationToken cancellationToken = default)
    {
        return await JsonSerializer.DeserializeAsync<T>(utf8Json, _options, cancellationToken);
    }

    public async ValueTask SerializeAsync<T>(T value, Stream utf8Json, CancellationToken cancellationToken = default)
    {
        await JsonSerializer.SerializeAsync(utf8Json, value, _options, cancellationToken);
    }
}
