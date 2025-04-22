using Microsoft.Azure.Functions.Worker;

namespace ProvaTeste.Test.Util;
public class FakeInvocationFeatures : IInvocationFeatures
{
    private readonly Dictionary<Type, object> _features = new();

    public T? Get<T>()
    {
        _features.TryGetValue(typeof(T), out var feature);
        return (T?)feature;
    }

    public void Set<T>(T? instance)
    {
        if (instance is null)
        {
            _features.Remove(typeof(T));
        }
        else
        {
            _features[typeof(T)] = instance;
        }
    }

    public IEnumerator<KeyValuePair<Type, object>> GetEnumerator()
    {
        return _features.GetEnumerator();
    }

    System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }
}
