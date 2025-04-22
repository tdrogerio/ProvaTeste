//using Microsoft.Azure.Functions.Worker;
//using ProvaTeste.Test.Util.Interfaces;

//namespace ProvaTeste.Test.Util;
//public class FakeFunctionContext : FunctionContext
//{
//    private readonly IServiceProvider _serviceProvider;
//    private readonly Dictionary<Type, object> _features = new();

//    public FakeFunctionContext(IServiceProvider serviceProvider)
//    {
//        _serviceProvider = serviceProvider;

//        // 🔹 Adiciona o serializador JSON ao contexto
//        _features[typeof(IWorkerOptions)] = new WorkerOptions();
//        _features[typeof(IInputConverterProvider)] = new DefaultInputConverterProvider();
//        _features[typeof(IOutputConverterProvider)] = new DefaultOutputConverterProvider();
//    }
//    public override IServiceProvider InstanceServices
//    {
//        get => _serviceProvider;
//        set => throw new NotImplementedException();
//    }

//    public override string InvocationId => Guid.NewGuid().ToString();

//    public override FunctionDefinition FunctionDefinition => new FakeFunctionDefinition();

//    public override string FunctionId => throw new NotImplementedException();

//    public override TraceContext TraceContext => throw new NotImplementedException();

//    public override BindingContext BindingContext => throw new NotImplementedException();

//    public override RetryContext RetryContext => throw new NotImplementedException();

//    public override IDictionary<object, object> Items { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

//    public override IDictionary<Type, object> Features => _features;
//}



using Microsoft.Azure.Functions.Worker;
using ProvaTeste.Test.Util.Interfaces;
using ProvaTeste.Test.Util;

//public class FakeFunctionContext : FunctionContext
//{
//    private readonly IServiceProvider _serviceProvider;
//    private readonly DefaultInvocationFeatures _features = new();

//    public FakeFunctionContext(IServiceProvider serviceProvider)
//    {
//        _serviceProvider = serviceProvider;

//        // 🔹 Adiciona os serviços necessários ao contexto
//        var workerOptions = new ProvaTeste.Test.Util.WorkerOptions();
//        _features.Set<IWorkerOptions>(workerOptions);
//        _features.Set<IInputConverterProvider>(new DefaultInputConverterProvider());
//        _features.Set<IOutputConverterProvider>(new DefaultOutputConverterProvider());
//    }

//    public override IServiceProvider InstanceServices
//    {
//        get => _serviceProvider;
//        set => throw new NotImplementedException();
//    }

//    public override string InvocationId => Guid.NewGuid().ToString();

//    public override FunctionDefinition FunctionDefinition => new FakeFunctionDefinition();

//    // ✅ Agora usa DefaultInvocationFeatures para corrigir o erro
//    public override IInvocationFeatures Features => _features;

//    public override string FunctionId => throw new NotImplementedException();

//    public override TraceContext TraceContext => throw new NotImplementedException();

//    public override BindingContext BindingContext => throw new NotImplementedException();

//    public override RetryContext RetryContext => throw new NotImplementedException();

//    public override IDictionary<object, object> Items { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
//}


public class FakeFunctionContext : FunctionContext
{
    private readonly IServiceProvider _serviceProvider;
    private readonly FakeInvocationFeatures _features = new();

    public FakeFunctionContext(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;

        // 🔹 Adiciona os serviços necessários ao contexto
        _features.Set<IWorkerOptions>(new ProvaTeste.Test.Util.WorkerOptions());
        _features.Set<IInputConverterProvider>(new DefaultInputConverterProvider());
        _features.Set<IOutputConverterProvider>(new DefaultOutputConverterProvider());
    }

    public override IServiceProvider InstanceServices
    {
        get => _serviceProvider;
        set => throw new NotImplementedException();
    }

    public override string InvocationId => Guid.NewGuid().ToString();

    public override FunctionDefinition FunctionDefinition => new FakeFunctionDefinition();

    // ✅ Agora usa FakeInvocationFeatures, corrigindo o erro
    public override IInvocationFeatures Features => _features;

    public override string FunctionId => throw new NotImplementedException();

    public override TraceContext TraceContext => throw new NotImplementedException();

    public override BindingContext BindingContext => throw new NotImplementedException();

    public override RetryContext RetryContext => throw new NotImplementedException();

    public override IDictionary<object, object> Items { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
}
