using System.Collections.Specialized;
using System.Linq;
using Newtonsoft.Json;

namespace ProvaTeste.Infrastructure.Extensions
{
    public static class NameValueCollectionExtensions
    {

        public static T? Deserialize<T>(this NameValueCollection query)
        {
            return JsonConvert
                    .DeserializeObject<T>(
                        JsonConvert
                            .SerializeObject(query.AllKeys.ToDictionary(key => key!, key => query[key]))
                    );
        }
    }
}
