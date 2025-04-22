using System.Security.Claims;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Azure.Functions.Worker;
using System.Text;

namespace ProvaTeste.Test.Util;
public class FakeHttpRequestData : HttpRequestData
{
    private Stream _body;
    private readonly HttpHeadersCollection _headers;
    private readonly FunctionContext _functionContext;
    
    public FakeHttpRequestData(FunctionContext functionContext, string? method, string? body = "", Dictionary<string, string>? headers = null) : base(functionContext)
    {
        _functionContext = functionContext;
        _headers = new HttpHeadersCollection();

        if (headers != null)
        {
            foreach (var header in headers)
            {
                _headers.Add(header.Key, header.Value);
            }
        }
        
        // Inicializar o body com o conteúdo da string
        _body = new MemoryStream();
        if (!string.IsNullOrEmpty(body))
        {
            var bytes = Encoding.UTF8.GetBytes(body);
            _body.Write(bytes, 0, bytes.Length);
            _body.Position = 0; // Resetar a posição para leitura
        }
        
        Url = new Uri("http://localhost:7254/api");
        Method = method;
    }
    
    public FakeHttpRequestData(FunctionContext functionContext, Stream body) : base(functionContext)
    {
        _functionContext = functionContext;
        _headers = new HttpHeadersCollection();
        _body = body;
    }
    
    public override Stream Body => _body;
    public override HttpHeadersCollection Headers => _headers;
    public override Uri Url { get; }
    public override IReadOnlyCollection<IHttpCookie> Cookies => new List<IHttpCookie>();
    public override IEnumerable<ClaimsIdentity> Identities => new List<ClaimsIdentity>();
    public override string Method { get; }
    
    public override HttpResponseData CreateResponse()
    {
        return new FakeHttpResponseData(FunctionContext);
    }
}

//public class FakeHttpRequestDataCadastrar : HttpRequestData
//{
//    private readonly HttpHeadersCollection _headers;
//    public FakeHttpRequestDataCadastrar(FunctionContext functionContext, string? method, string? body = "", Dictionary<string, string>? headers = null)
//        : base(functionContext)
//    {
//        _headers = new HttpHeadersCollection();

//        if (headers != null)
//        {
//            foreach (var header in headers)
//            {
//                _headers.Add(header.Key, header.Value);
//            }
//        }
//        Url = new Uri("http://localhost:7254/api");
//        Method = method;
//    }
//    private readonly FunctionContext _functionContext;
//    public FakeHttpRequestDataCadastrar(FunctionContext functionContext, Stream body)
//        : base(functionContext)
//    {
//        _functionContext = functionContext;
//        Headers = new HttpHeadersCollection();
//        Body = body;
//    }
//    public override Stream Body { get; }
//    public override HttpHeadersCollection Headers { get; }
//    public override Uri Url { get; }
//    public override IEnumerable<ClaimsIdentity> Identities => new List<ClaimsIdentity>();
//    public override IReadOnlyCollection<IHttpCookie> Cookies => new List<IHttpCookie>();
//    public override string Method { get; }
//    public override HttpResponseData CreateResponse()
//    {
//        return new FakeHttpResponseData(_functionContext);
//    }
//}