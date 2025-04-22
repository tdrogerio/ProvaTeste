using Microsoft.Azure.Functions.Worker;
using ProvaTeste.Test.Util.Interfaces;

namespace ProvaTeste.Test.Util;
public class PocoOutputConverter : IOutputConverter
{
    public bool CanConvert(Type type, object? value) => true;

    public async Task<object?> ConvertAsync(object? value, FunctionContext context)
    {
        return value;
    }
}