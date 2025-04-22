using Microsoft.Azure.Functions.Worker;
using System.Collections.Immutable;

namespace ProvaTeste.Test.Util;
public class FakeFunctionDefinition : FunctionDefinition
{
    public override string Name => "FakeFunction";

    public override string EntryPoint => "FakeNamespace.FakeFunction";

    public override ImmutableArray<FunctionParameter> Parameters => throw new NotImplementedException();

    public override string PathToAssembly => throw new NotImplementedException();

    public override string Id => throw new NotImplementedException();


    //public override IReadOnlyDictionary<string, BindingMetadata> InputBindings => new Dictionary<string, BindingMetadata>();
    public override IImmutableDictionary<string, BindingMetadata> InputBindings => throw new NotImplementedException();


    //public override IReadOnlyDictionary<string, BindingMetadata> OutputBindings => new Dictionary<string, BindingMetadata>();
    public override IImmutableDictionary<string, BindingMetadata> OutputBindings => throw new NotImplementedException();
}