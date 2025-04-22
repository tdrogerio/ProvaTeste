using System.IO;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ProvaTeste.Infrastructure.Extensions
{
    public static class StreamExtensions
    {

        public static async Task<T?> DeserializeAsync<T>(this Stream stream)
        {
            using var reader = new StreamReader(stream);
            return JsonConvert
                .DeserializeObject<T>(
                    await reader
                        .ReadToEndAsync()
                );
        }
    }
}
