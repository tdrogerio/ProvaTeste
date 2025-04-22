using Microsoft.Azure.Functions.Worker.Converters;
using Microsoft.Azure.Functions.Worker;

namespace ProvaTeste.Test.Util;
public class PocoInputConverter : IInputConverter
{
    public bool CanConvert(Type type, FunctionContext functionContext)
    {
        return true; // Permite converter qualquer tipo
    }

    public async ValueTask<ConversionResult> ConvertAsync(ConverterContext context)
    {
        try
        {
            //using var reader = new StreamReader(context.Source);
            //var json = await reader.ReadToEndAsync();
            //var deserializedObject = JsonSerializer.Deserialize(json, context.TargetType);
            //return ConversionResult.Success(deserializedObject);
            return ConversionResult.Success(null);
        }
        catch (Exception ex)
        {
            return ConversionResult.Failed(ex);
        }
    }
}