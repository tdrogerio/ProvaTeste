# 📋 Cadastro de Pessoas - Sistema de Gerenciamento

![.NET Version](https://img.shields.io/badge/.NET-8.0-blue)
![Angular](https://img.shields.io/badge/Angular-v15+-dd0031)
![Azure Functions](https://img.shields.io/badge/Azure_Functions-v4-blue)
![License](https://img.shields.io/badge/license-MIT-green)

Sistema full stack para cadastro e gerenciamento de pessoas físicas e jurídicas, com validações específicas e arquitetura baseada em boas práticas modernas de desenvolvimento.

---

## 🚀 Tecnologias Utilizadas

- **Frontend**: [Angular](https://angular.io/)
- **Backend**: [.NET 8.0+](https://dotnet.microsoft.com/en-us/)
- **Serverless**: [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/)
- **Banco de Dados**: à escolha do desenvolvedor (Ex: SQL Server, PostgreSQL, MySQL)
- **Arquitetura**: DDD + CQRS + Event Sourcing

---

## 📝 Funcionalidades

- Cadastro de pessoas físicas e jurídicas
- Validações específicas por tipo de pessoa (física ou jurídica)
- Garantia de unicidade por CPF/CNPJ e E-mail
- Cadastro completo com informações pessoais e endereço
- Estrutura baseada em DDD, com CQRS e Event Sourcing
- API em arquitetura Serverless com Azure Functions

---

## ⚙️ Instalação do Azure Functions

Você pode instalar o Azure Functions Core Tools com o comando abaixo:

```bash
npm install -g azure-functions-core-tools@4 --unsafe-perm true
```

Mais informações na [documentação oficial](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local).

---

## 📦 Estrutura das Azure Functions

```
backend/
├── ProvaTeste.Functions/
│   ├── Functions
│       ├── ClientFunction.cs
├── ProvaTeste.Domain/
├── ProvaTeste.Application/
├── ProvaTeste.Infrastructure/
└── ProvaTeste.Test/
```

---

## 📡 Endpoints da API (Azure Functions)

| Método | Rota                                  | Descrição                          |
|--------|---------------------------------------|-------------------------------------|
| POST   | `/api/Client/CreateClient`            | Cadastrar nova pessoa              |
| GET    | `/api/Client/GetClientById/{id}`      | Obter pessoa por ID                |
| GET    | `/api/Client/GetAllClients`           | Listar todas as pessoas            |
| PUT    | `/api/Client/UpdateClient/{id}`       | Atualizar dados da pessoa          |
| DELETE | `/api/Client/DeleteClient/{id}`       | Remover pessoa do sistema          |

---

## 📌 Regras de Negócio

- ✅ Apenas **um cadastro por CPF/CNPJ e E-mail**
- ✅ **Pessoa Física**: idade mínima de 18 anos
- ✅ **Pessoa Jurídica**: informar **IE** (Inscrição Estadual) ou marcar como **Isento**
- ✅ Validações implementadas **tanto no frontend quanto no backend**

---

## 📄 Campos do Formulário

### 👤 Dados Pessoais

- Nome / Razão Social  
- CPF / CNPJ  
- Data de Nascimento  
- Telefone  
- E-mail  

### 🏠 Endereço

- CEP  
- Endereço  
- Número  
- Bairro  
- Cidade  
- Estado  

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos

- Angular CLI instalado:
  ```bash
  npm install -g @angular/cli
  ```
- .NET 8 SDK instalado
- Azure Functions Core Tools instalado:
  ```bash
  npm install -g azure-functions-core-tools@4 --unsafe-perm true
  ```
- Banco de dados configurado (Ex: SQL Server, PostgreSQL, etc.)

### Backend

```bash
cd backend
dotnet restore
dotnet build
func start
```

### Frontend

```bash
cd frontend
npm install
ng serve
```

Acesse em: [http://localhost:4200](http://localhost:4200)

---

## 🧪 Testes Unitários

### Backend

```bash
dotnet test
```

### Frontend

```bash
ng test
```

---

## 📁 Organização do Projeto

```
📦 ProvaTeste
├── frontend/           # Código Angular
└── backend/            # Azure Functions + .NET 8 com estrutura DDD
    ├── ProvaTeste/Functions/
    ├── ProvaTeste/Domain/
    ├── ProvaTeste/Application/
    ├── ProvaTeste/Infrastructure/
    ├── ProvaTeste/Test/
```

---

## 📄 Licença

Este projeto está licenciado sob a Licença **MIT** - veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## 🔗 Links Úteis

- [Angular Documentation](https://angular.io/docs)
- [.NET 8 Documentation](https://learn.microsoft.com/en-us/dotnet/)
- [Azure Functions Documentation](https://learn.microsoft.com/en-us/azure/azure-functions/)
- [Guia de DDD - Martin Fowler](https://martinfowler.com/tags/domain%20driven%20design.html)
- [CQRS Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)
- [Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html)

---
