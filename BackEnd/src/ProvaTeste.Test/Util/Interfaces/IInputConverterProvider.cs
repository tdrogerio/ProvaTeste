using Microsoft.Azure.Functions.Worker.Converters;

namespace ProvaTeste.Test.Util.Interfaces;
public interface IInputConverterProvider
{
    IReadOnlyList<IInputConverter> InputConverters { get; }
}