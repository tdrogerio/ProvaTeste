# 📋 Cadastro de Pessoas - Sistema de Gerenciamento

![.NET Version](https://img.shields.io/badge/.NET-8.0-blue)
![Angular](https://img.shields.io/badge/Angular-v15+-dd0031)
![Azure Functions](https://img.shields.io/badge/Azure_Functions-v4-blue)
![Docker](https://img.shields.io/badge/Docker-Compose-blue)
![License](https://img.shields.io/badge/license-MIT-green)

Sistema full stack para cadastro e gerenciamento de pessoas físicas e jurídicas, com validações específicas e arquitetura baseada em boas práticas modernas de desenvolvimento.

---

## 🚀 Tecnologias Utilizadas

- **Frontend**: [Angular](https://angular.io/)
  - ✅ Rápido desenvolvimento com CLI robusta
  - ✅ Ecossistema maduro e excelente suporte a testes
- **Backend**: [.NET 8.0+](https://dotnet.microsoft.com/en-us/)
  - ✅ Performance de alto nível com ASP.NET Core
  - ✅ Suporte nativo a APIs modernas e arquitetura limpa
- **Serverless**: [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/)
  - ✅ Custo-benefício com execução sob demanda
  - ✅ Alta escalabilidade sem gestão de infraestrutura
- **Containerização**: [Docker Compose](https://docs.docker.com/compose/)
  - ✅ Facilidade de orquestração de múltiplos serviços
  - ✅ Reprodutibilidade do ambiente local para produção
- **CI/CD**: [Azure Pipelines](https://azure.microsoft.com/en-us/products/devops/pipelines/)
  - ✅ Automação do ciclo de vida de entrega
  - ✅ Integração direta com Azure e GitHub

---

## 📦 Containerização com Docker Compose

### docker-compose.yml

```yaml
version: '3.8'

services:
  backend:
    image: mcr.microsoft.com/dotnet/aspnet:8.0
    container_name: backend
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:80"
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ConnectionStrings__DefaultConnection=Server=db;Database=ProvaTesteDB;User Id=sa;Password=YourStrong!Password
    depends_on:
      - db

  frontend:
    image: node:18
    container_name: frontend
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "4200:4200"
    command: ["npm", "start"]

  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: db
    ports:
      - "1433:1433"
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=YourStrong!Password
    volumes:
      - db_data:/var/opt/mssql

volumes:
  db_data:
```

---

### Dockerfile - Backend

```dockerfile
# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "ProvaTeste.dll"]
```

### Dockerfile - Frontend

```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4200
CMD ["npm", "start"]
```

---

## ⚙️ Azure Functions

Instale o Azure Functions Core Tools com:

```bash
npm install -g azure-functions-core-tools@4 --unsafe-perm true
```

Mais detalhes: [Azure Functions Docs](https://learn.microsoft.com/en-us/azure/azure-functions/)

### Endpoints Disponíveis

| Método | Rota                    | Descrição                          |
|--------|-------------------------|-------------------------------------|
| POST   | `/api/person`           | Cadastrar nova pessoa              |
| GET    | `/api/person/{id}`      | Obter pessoa por ID                |
| GET    | `/api/person`           | Listar todas as pessoas            |
| PUT    | `/api/person/{id}`      | Atualizar dados da pessoa          |
| DELETE | `/api/person/{id}`      | Remover pessoa do sistema          |

---

## 🔄 Azure Pipelines

### Backend: azure-pipelines.yml

- ✅ Automatiza build e deploy para Azure Functions
- ✅ Suporte a testes e análise com SonarCloud

### Frontend: azure-pipelines.yml

- ✅ Geração de artefatos Angular
- ✅ Publicação contínua em Azure Static Web Apps

---

## 📌 Regras de Negócio

- ✅ Apenas **um cadastro por CPF/CNPJ e E-mail**
- ✅ **Pessoa Física**: idade mínima de 18 anos
- ✅ **Pessoa Jurídica**: informar **IE** ou marcar como **Isento**
- ✅ Validações no **frontend** e **backend**

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

## 🧪 Testes Unitários

```bash
# Backend
dotnet test

# Frontend
ng test
```

---

## 📁 Organização do Projeto

```
📦 projeto-cadastro
├── frontend/           # Código Angular
│   └── Dockerfile
├── backend/            # Azure Functions + .NET 8 com estrutura DDD
│   └── Dockerfile
├── docker-compose.yml
├── azure-pipelines.yml (Frontend e Backend)
```

---

## 📄 Licença

Este projeto está licenciado sob a Licença **MIT** - veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## 🔗 Links Úteis

- [Angular Documentation](https://angular.io/docs)
- [.NET 8 Documentation](https://learn.microsoft.com/en-us/dotnet/)
- [Azure Functions Documentation](https://learn.microsoft.com/en-us/azure/azure-functions/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Azure Pipelines](https://learn.microsoft.com/en-us/azure/devops/pipelines/)
- [Guia de DDD - Martin Fowler](https://martinfowler.com/tags/domain%20driven%20design.html)
- [CQRS Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)
- [Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html)