using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ProvaTeste.Application;
using ProvaTeste.Infrastructure;
using ProvaTeste.Infrastructure.Function;
using System.Linq;

var builder = FunctionsApplication.CreateBuilder(args);

//https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-process-guide?tabs=ihostapplicationbuilder%2Cwindows#start-up-and-configuration
builder.Services
    .AddApplication()
    .AddInfrastructure()
    .AddApplicationInsightsTelemetryWorkerService()
    .ConfigureFunctionsApplicationInsights()
    .Configure<LoggerFilterOptions>(options =>
    {
        var rule = options.Rules.FirstOrDefault(rule => rule.ProviderName == "Microsoft.Extensions.Logging.ApplicationInsights.ApplicationInsightsLoggerProvider");

        if (rule is not null)
            options.Rules.Remove(rule);
    })
;

var functionsWithoutAuth = new[]
{
    "Debug"
};

var functionsWithPrefixes = functionsWithoutAuth
    .ToArray();

builder
    .ConfigureFunctionsWebApplication()
    .UseMiddleware<ExceptionFunctionWorkerMiddleware>()    
    .UseWhen<AuthorizationMiddleware>(c => !functionsWithPrefixes.Contains(c.FunctionDefinition.Name));

await builder
    .Build()
    .RunAsync();