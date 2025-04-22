using System;
using System.IO;
using System.Runtime.CompilerServices;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using ProvaTeste.Infrastructure;

[assembly: InternalsVisibleTo("ProvaTeste.Test")]

var configuration = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", true, false)
    .Build();

Environment.SetEnvironmentVariable("SQLCONNSTR_AZURE_SQL_CONNECTIONSTRING", configuration.GetValue<string>("SQLCONNSTR_AZURE_SQL_CONNECTIONSTRING"));
var builder = Host.CreateDefaultBuilder(args)
    .ConfigureServices(services =>
    {
        services.AddInfrastructure();
    })
    .Build();