using Microsoft.Azure.Functions.Worker.Converters;
using ProvaTeste.Test.Util.Interfaces;

namespace ProvaTeste.Test.Util;

public class DefaultInputConverterProvider : IInputConverterProvider
{
    public IReadOnlyList<IInputConverter> InputConverters { get; } = new List<IInputConverter>
    {
        new PocoInputConverter()
    };
}

public class DefaultOutputConverterProvider : IOutputConverterProvider
{
    public IReadOnlyList<IOutputConverter> OutputConverters { get; } = new List<IOutputConverter>
    {
        new PocoOutputConverter()
    };
}