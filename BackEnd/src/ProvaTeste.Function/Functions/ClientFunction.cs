using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using ProvaTeste.Domain.Entities;
using ProvaTeste.Domain.Interfaces.Services;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Teste;

namespace ProvaTeste.Function.Functions.TrackSys
{
    public class ClientFunction
    {
        private readonly IClientService _clientService;

        public ClientFunction(IClientService clientService)
        {
            _clientService = clientService;
        }

        [Function("GetAllClients")]
        public async Task<HttpResponseData> GetAllClients([HttpTrigger(AuthorizationLevel.Function, "get")] HttpRequestData req)
        {
            var clients = await _clientService.ObterTodos();
            var response = req.CreateResponse(HttpStatusCode.OK);
            await response.WriteAsJsonAsync(clients);
            return response;
        }

        [Function("GetClientById")]
        public async Task<HttpResponseData> GetClientById([HttpTrigger(AuthorizationLevel.Function, "get", Route = "clients/{id:int}")] HttpRequestData req, int id)
        {
            var client = await _clientService.ObterPorId(id);
            var response = req.CreateResponse(client != null ? HttpStatusCode.OK : HttpStatusCode.NotFound);
            if (client != null)
            {
                await response.WriteAsJsonAsync(client);
            }
            return response;
        }

        [Function("CreateClient")]
        public async Task<HttpResponseData> CreateClient([HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequestData req)
        {
            var client = await req.ReadFromJsonAsync<Client>();
            if (client == null)
            {
                var badRequestResponse = req.CreateResponse(HttpStatusCode.BadRequest);
                await badRequestResponse.WriteStringAsync("Invalid client data.");
                return badRequestResponse;
            }

            await _clientService.Cadastrar(client);
            var response = req.CreateResponse(HttpStatusCode.Created);
            await response.WriteAsJsonAsync(client);
            return response;
        }

        [Function("UpdateClient")]
        public async Task<HttpResponseData> UpdateClient([HttpTrigger(AuthorizationLevel.Function, "put")] HttpRequestData req)
        {
            var client = await req.ReadFromJsonAsync<Client>();
            if (client == null)
            {
                var badRequestResponse = req.CreateResponse(HttpStatusCode.BadRequest);
                await badRequestResponse.WriteStringAsync("Invalid client data.");
                return badRequestResponse;
            }

            await _clientService.Editar(client);
            var response = req.CreateResponse(HttpStatusCode.OK);
            await response.WriteAsJsonAsync(client);
            return response;
        }

        [Function("DeleteClient")]
        public async Task<HttpResponseData> DeleteClient([HttpTrigger(AuthorizationLevel.Function, "delete")] HttpRequestData req)
        {
            var client = await req.ReadFromJsonAsync<Client>();
            if (client == null)
            {
                var badRequestResponse = req.CreateResponse(HttpStatusCode.BadRequest);
                await badRequestResponse.WriteStringAsync("Invalid client data.");
                return badRequestResponse;
            }

            await _clientService.Excluir(client);
            var response = req.CreateResponse(HttpStatusCode.NoContent);
            return response;
        }
    }
}
