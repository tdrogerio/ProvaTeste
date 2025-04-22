using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using ProvaTeste.Domain.Entities;
using ProvaTeste.Domain.Interfaces.Services;
using ProvaTeste.Function.Functions.TrackSys;
using ProvaTeste.Test.Util;
using Moq;
using System.Net;
using System.Text.Json;
using Teste;
using Xunit;

namespace ProvaTeste.Test.Functions.TrackSys
{
    public class ClientFunctionTests
    {
        private readonly Mock<IClientService> _clientServiceMock;
        private readonly ClientFunction _function;
        private readonly Mock<FunctionContext> _functionContextMock;

        public ClientFunctionTests()
        {
            _clientServiceMock = new Mock<IClientService>();
            _functionContextMock = new Mock<FunctionContext>();
            _function = new ClientFunction(_clientServiceMock.Object);
        }

        private HttpRequestData CreateFakeRequest(string method, string body = "")
        {
            var request = new FakeHttpRequestData(_functionContextMock.Object, method, body);
            return request;
        }

        [Fact]
        [Trait("CreateClient", "Client")]
        public async Task CreateClient_ShouldCreateClient_WhenValid()
        {
            // Arrange
            var client = new Client { Id = "1", Name = "Client 1" };
            var requestBody = JsonSerializer.Serialize(client);

            _clientServiceMock.Setup(s => s.Cadastrar(It.IsAny<Client>())).Returns(Task.CompletedTask);

            var request = CreateFakeRequest("POST", requestBody);

            // Act
            var response = await _function.CreateClient(request);

            // Assert
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            _clientServiceMock.Verify(s => s.Cadastrar(It.IsAny<Client>()), Times.Once);
        }

        [Fact]
        [Trait("UpdateClient", "Client")]
        public async Task UpdateClient_ShouldUpdateClient_WhenValid()
        {
            // Arrange
            var client = new Client { Id = "1", Name = "Updated Client" };
            var requestBody = JsonSerializer.Serialize(client);

            _clientServiceMock.Setup(s => s.Editar(It.IsAny<Client>())).Returns(Task.CompletedTask);

            var request = CreateFakeRequest("PUT", requestBody);

            // Act
            var response = await _function.UpdateClient(request);

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            _clientServiceMock.Verify(s => s.Editar(It.IsAny<Client>()), Times.Once);
        }

        [Fact]
        [Trait("DeleteClient", "Client")]
        public async Task DeleteClient_ShouldDeleteClient_WhenValid()
        {
            // Arrange
            var client = new Client { Id = "1", Name = "Client to Delete" };
            var requestBody = JsonSerializer.Serialize(client);

            _clientServiceMock.Setup(s => s.Excluir(It.IsAny<Client>())).Returns(Task.CompletedTask);

            var request = CreateFakeRequest("DELETE", requestBody);

            // Act
            var response = await _function.DeleteClient(request);

            // Assert
            Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
            _clientServiceMock.Verify(s => s.Excluir(It.IsAny<Client>()), Times.Once);
        }
    }
}
