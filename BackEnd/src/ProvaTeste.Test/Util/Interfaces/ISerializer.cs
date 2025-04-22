namespace ProvaTeste.Test.Util.Interfaces; 
public interface ISerializer
{
    ValueTask<T?> DeserializeAsync<T>(Stream utf8Json, CancellationToken cancellationToken = default);
    ValueTask SerializeAsync<T>(T value, Stream utf8Json, CancellationToken cancellationToken = default);
}