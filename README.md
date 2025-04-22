# Cadastro de Pessoas - Sistema de Gerenciamento

![.NET Version](https://img.shields.io/badge/.NET-8.0-blue)
![Angular](https://img.shields.io/badge/Angular-v15+-dd0031)
![License](https://img.shields.io/badge/license-MIT-green)

Sistema full stack para cadastro e gerenciamento de pessoas físicas e jurídicas, com validações específicas e arquitetura baseada em boas práticas modernas de desenvolvimento.

## 🚀 Tecnologias Utilizadas

- **Frontend**: [Angular](https://angular.io/)
- **Backend**: [.NET 8.0+](https://dotnet.microsoft.com/en-us/)
- **Banco de Dados**: à escolha do desenvolvedor (Ex: SQL Server, PostgreSQL, MySQL)
- **Arquitetura**: DDD + CQRS + Event Sourcing

---

## 📝 Funcionalidades

- Cadastro de pessoas físicas e jurídicas
- Validações específicas por tipo de pessoa (física ou jurídica)
- Garantia de unicidade por CPF/CNPJ e E-mail
- Cadastro completo com informações pessoais e endereço
- Estrutura baseada em DDD, com CQRS e Event Sourcing

---

## 📌 Regras de Negócio

- ✅ Apenas **um cadastro por CPF/CNPJ e E-mail**
- ✅ **Pessoa Física**: idade mínima de 18 anos
- ✅ **Pessoa Jurídica**: informar **IE** (Inscrição Estadual) ou marcar como **Isento**
- ✅ Validações implementadas **tanto no frontend quanto no backend**

---

## 📄 Campos do Formulário

### Dados Pessoais

- Nome / Razão Social  
- CPF / CNPJ  
- Data de Nascimento  
- Telefone  
- E-mail  

### Endereço

- CEP  
- Endereço  
- Número  
- Bairro  
- Cidade  
- Estado  

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos

- Angular CLI instalado (`npm install -g @angular/cli`)
- .NET 8 SDK instalado
- Banco de dados configurado (Ex: SQL Server, PostgreSQL, etc.)

### Backend

```bash
cd backend
dotnet restore
dotnet build
dotnet run
