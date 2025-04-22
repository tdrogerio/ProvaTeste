namespace ProvaTeste.Test.Util.Interfaces; 
public interface IOutputConverterProvider
{
    IReadOnlyList<IOutputConverter> OutputConverters { get; }
}