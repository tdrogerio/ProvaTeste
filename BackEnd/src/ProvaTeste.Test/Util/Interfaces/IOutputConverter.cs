using Microsoft.Azure.Functions.Worker;

namespace ProvaTeste.Test.Util.Interfaces;
public interface IOutputConverter
{
    bool CanConvert(Type type, object? value);
    Task<object?> ConvertAsync(object? value, FunctionContext context);
}