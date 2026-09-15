# DevVault

> Plataforma distribuída para análise e gerenciamento de documentos, usuários e processos de aprovação.

🚧 **Status: Em desenvolvimento**

O **DevVault** é um projeto de portfólio desenvolvido com foco em backend, arquitetura de microsserviços e práticas de engenharia de software.

O projeto busca simular uma aplicação próxima de um cenário profissional, explorando autenticação, APIs REST, persistência de dados, comunicação entre serviços, mensageria, observabilidade, Docker e CI/CD.

---

## 🎯 Objetivo

O objetivo do DevVault é colocar em prática conceitos e tecnologias utilizados no desenvolvimento de aplicações backend modernas, com foco em:

- Arquitetura de microsserviços
- APIs REST
- Autenticação e autorização
- Persistência e modelagem de dados
- Comunicação entre serviços
- Mensageria e processamento assíncrono
- Containers
- CI/CD
- Observabilidade
- Testes automatizados
- Boas práticas de desenvolvimento
- Documentação técnica

O projeto está sendo desenvolvido de forma incremental, com cada funcionalidade sendo implementada e versionada separadamente.

---

## 🏗️ Arquitetura

O DevVault utiliza uma arquitetura baseada em microsserviços dentro de um monorepo.

```text
                         ┌─────────────────────┐
                         │      Frontend       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    API Gateway      │
                         └──────────┬──────────┘
                                    │
             ┌──────────────────────┼──────────────────────┐
             │                      │                      │
             ▼                      ▼                      ▼
      ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
      │ Auth Service│       │ User Service│       │  Document   │
      │             │       │             │       │   Service   │
      └─────────────┘       └─────────────┘       └─────────────┘
             │                      │                      │
             └──────────────────────┼──────────────────────┘
                                    │
                                    ▼
                             ┌─────────────┐
                             │ PostgreSQL  │
                             └─────────────┘

                    Comunicação assíncrona
                              │
                              ▼
                     ┌─────────────────┐
                     │    Messaging    │
                     └─────────────────┘