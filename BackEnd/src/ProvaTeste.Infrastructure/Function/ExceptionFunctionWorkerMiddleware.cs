namespace ProvaTeste.Infrastructure.Function
{
    using System.Threading.Tasks;
    using System.Net;
    using System;
    using Microsoft.Azure.Functions.Worker;
    using ProvaTeste.Domain.Exceptions;
    using Microsoft.Azure.Functions.Worker.Middleware;
    using Microsoft.Extensions.Logging;
    using Microsoft.Azure.Functions.Worker.Http;
    using Microsoft.IdentityModel.Tokens;

    public class ExceptionFunctionWorkerMiddleware(ILogger<ExceptionFunctionWorkerMiddleware> logger) : IFunctionsWorkerMiddleware
    {
        public async Task Invoke(FunctionContext context, FunctionExecutionDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (DomainException ex)
            {
                logger.LogError(ex, $"{nameof(HttpStatusCode.BadRequest)}: ");
                var request = await context.GetHttpRequestDataAsync();
                if (request == default)
                    throw;
                var response = request?.CreateResponse(HttpStatusCode.BadRequest);
                if (response == default)
                    throw;
                await response.WriteAsJsonAsync(ex.Requeriments);
            }
            catch (NotImplementedException ex)
            {
                logger.LogError(ex, $"{nameof(HttpStatusCode.NotImplemented)}: ");
                var request = await context.GetHttpRequestDataAsync();
                if (request == default)
                    throw;
                var response = request?.CreateResponse(HttpStatusCode.NotImplemented);
                if (response == default)
                    throw;
            }
            catch (Exception ex) when (
                ex is SecurityTokenExpiredException || 
                ex is UnauthorizedAccessException)
            {
                logger.LogError(ex, $"{nameof(HttpStatusCode.Unauthorized)}: ");
                var request = await context.GetHttpRequestDataAsync();
                if (request == default)
                    throw;
                var response = request?.CreateResponse(HttpStatusCode.Unauthorized);
                if (response == default)
                    throw;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"{nameof(HttpStatusCode.InternalServerError)}: ");
                var request = await context.GetHttpRequestDataAsync();
                if (request == default)
                    throw;
                var response = request?.CreateResponse(HttpStatusCode.InternalServerError);
                if (response == default)
                    throw;
                throw;
            }
        }
    }
}
