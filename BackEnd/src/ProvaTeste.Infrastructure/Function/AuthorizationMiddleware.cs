using Microsoft.Azure.Functions.Worker.Middleware;
using ProvaTeste.Domain.Interfaces.Services;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Azure.Functions.Worker;

namespace ProvaTeste.Infrastructure.Function
{
    public class AuthorizationMiddleware(ITokenService _tokenservice) : IFunctionsWorkerMiddleware
    {
        public async Task Invoke(FunctionContext context, FunctionExecutionDelegate next)
        {
            var requestData = await context.GetHttpRequestDataAsync();

            var authorizationHeader = requestData?
                .Headers
                .SingleOrDefault(header => header.Key.Equals("Authorization", StringComparison.OrdinalIgnoreCase))
                .Value?
                .SingleOrDefault();

            var token = authorizationHeader?.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase) == true
                ? authorizationHeader[7..]
                : authorizationHeader;

            var principal = _tokenservice.ClaimsPrincipalObter(token);

            if (principal.Identity?.IsAuthenticated != true)
                throw new UnauthorizedAccessException();

            var functionName = context.FunctionDefinition.Name;
            var baseFunctionName = functionName.StartsWith("Core") ? functionName[4..] : 
                                 functionName.StartsWith("Track") ? functionName[5..] : 
                                 functionName;

            if (!principal.HasClaim(c => c.Type == "fun" && (c.Value == functionName || c.Value == baseFunctionName)))
            {
                var response = requestData?.CreateResponse(HttpStatusCode.Forbidden);
                if (response == null)
                    throw new Exception();
                return;
            }
            await next(context);
        }
    }
}
