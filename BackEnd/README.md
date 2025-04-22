# Estrutura do projeto

```
src/
├── ProvaTeste.Function/  # Azure Functions Layer (Interfaces de entrada) para os endpoints
│   ├── Function.cs
│   ├── Models/             # Modelos específicos do endpoint (DTOs)
│   ├── Program.cs          # Configuração das dependências
│   ├── host.json           # Configurações do host do Azure Functions
│   └── local.settings.json
│   ...                         # Um endpoint para cada Azure Function
│
├── ProvaTeste.Application/  # Application Layer
│   ├── Contracts/              # Interfaces de casos de uso e DTOs
│   ├── Services/               # Implementações de casos de uso
│   └── Extensions/             # Extensões de classes com foco no negócio
│
├── ProvaTeste.Domain/   # Domain Layer
│   ├── Entities/           # Entidades do domínio
│   ├── Exceptions/         # Exceções específicas do domínio
│   ├── ValueObjects/       # Objetos de Valor
│   ├── Interfaces/         # Interfaces para repositórios e serviços externos
│   │   ├── Services/       # Agrupamento das interfaces dos serviços
│   │   └── Repositories/   # Agrupamento das interfaces dos repositórios
│   ├── Specifications/     # Especificações para regras de negócio complexas
│   ├── Enums/              # Enumerações relacionadas ao domínio
│   └── Events/             # Eventos de domínio (opcional)
│
├── ProvaTeste.Infrastructure/   # Infrastructure Layer
│   ├── Persistence/                # Implementação de repositórios
│   │   ├── Configurations/         # Configurações de entidades (Ex.: Fluent API)
│   │   ├── DbContexts/             # Contexto do Entity Framework
│   │   ├── Migrations/             # Migrations do Entity Framework
│   │   ├── Repositories/           # Implementações de repositórios
│   │   └── Extensions/             # Extensões de classes con foco de instraestrutura
│   └── Services/                   # Serviços externos e integrações
│
└── ProvaTeste.Tests/    # Testes Unitários e de Integração
    ├── UnitTests/          # Testes de unidades específicas
    ├── IntegrationTests/   # Testes que validam fluxos de ponta-a-ponta
    └── Mocks/              # Implementações ou dados de mock
```

# Dependência entre os projetos

```
Domain  │
        │-> Application      │
        │-> Infrastructure   │
                             │-> AzureFunction  │
                                                │-> Test
```

# Contexto da aplicação
```
ProvaTeste/
├── Entity/     # Cadastros básicos no sistema
│   ├── Dispositivo/
│   │   ├── Visualizar
│   │   ├── Cadastrar
│   │   ├── Editar
│   │   └── Excluir
│   ├── Veículo/
│   │   ├── Visualizar
│   │   ├── Cadastrar
│   │   ├── Editar
│   │   └── Excluir
│   └── Chip
│       ├── Visualizar
│       ├── Cadastrar
│       ├── Editar
│       └── Excluir
├── Entry/      # Entrada no sistema
│   ├── Autenticação/
│   │   └── Entrar 
│   ├── Funcionalidade/
│   │   ├── Visualizar
│   │   ├── Cadastrar
│   │   ├── Editar
│   │   └── Excluir
│   ├── Perfil/
│   │   ├── Visualizar
│   │   ├── Cadastrar
│   │   ├── Editar
│   │   └── Excluir
│   └── Usuário/
│       ├── Visualizar
│       ├── Cadastrar
│       ├── Editar
│       └── Excluir
├── Engine/     # Configuração da aplicação
│   ├── Cliente/
│   │   ├── Visualizar
│   │   ├── Cadastrar
│   │   ├── Editar
│   │   └── Excluir
│   └── Instalador/
│       ├── Visualizar
│       ├── Cadastrar
│       ├── Editar
│       └── Excluir
└── provateste/    # ProvaTeste 
 
```

# Comandos de Migration

Para gerenciar as migrations do Entity Framework Core, utilize os seguintes comandos no terminal (PowerShell ou Bash):

```bash
# Criar uma nova migration
dotnet ef migrations add NomeDaMigration --project src/ProvaTeste.Infrastructure

# Aplicar as migrations no banco de dados
dotnet ef database update --project src/ProvaTeste.Infrastructure

# Remover a última migration (apenas se não foi aplicada ao banco)
dotnet ef migrations remove --project src/ProvaTeste.Infrastructure

# Listar todas as migrations
dotnet ef migrations list --project src/ProvaTeste.Infrastructure

# Gerar script SQL das migrations
dotnet ef migrations script --project src/ProvaTeste.Infrastructure

# Reverter o banco para uma migration específica
dotnet ef database update NomeDaMigration --project src/ProvaTeste.Infrastructure
```

Se estiver usando o Package Manager Console no Visual Studio:

```powershell
# Criar uma nova migration
Add-Migration NomeDaMigration -Project ProvaTeste.Infrastructure -OutputDir Persistence/Migrations

# Aplicar as migrations no banco de dados
Update-Database -Project ProvaTeste.Infrastructure

# Remover a última migration
Remove-Migration -Project ProvaTeste.Infrastructure

# Gerar script SQL
Script-Migration -Project ProvaTeste.Infrastructure
```