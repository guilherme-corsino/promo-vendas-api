# promo-vendas-api

API REST para gestão de estoque e vendas de produtos em promoção — desenvolvida para uso real no negócio de revenda PromoVendas.

## 🚀 Tecnologias

- NestJS + TypeScript
- PostgreSQL + Prisma ORM
- class-validator (validação de dados)
- Docker

## 🔐 Funcionalidades

- CRUD completo de produtos
- Controle de status — em estoque ou vendido
- Registro automático de data da venda
- Cálculo de preço de compra e venda por produto
- Validação de dados com decorators (class-validator)
- Arquitetura modular com injeção de dependência

## ⚙️ Como rodar localmente

### Pré-requisitos
- Node.js 18+
- Docker

### Passo a passo

```bash
# clone o repositório
git clone https://github.com/guilherme-corsino/promo-vendas-api.git
cd promo-vendas-api

# instale as dependências
npm install

# configure as variáveis de ambiente
cp .env.example .env

# suba o banco de dados
docker-compose up -d

# rode as migrations
npx prisma migrate dev

# rode o servidor
npm run start:dev
```

Acesse em: http://localhost:3000

## 📦 Endpoints

### Produtos
| Method | Route | Descrição |
|--------|-------|-----------|
| POST | /produtos | Cadastrar novo produto |
| GET | /produtos | Listar todos os produtos |
| GET | /produtos/:id | Buscar produto por id |
| PATCH | /produtos/:id | Atualizar produto |
| PATCH | /produtos/:id/vender | Marcar produto como vendido |
| DELETE | /produtos/:id | Remover produto |

## 📊 Sobre o projeto

O PromoVendas nasceu de uma necessidade real — controle de estoque e lucro na revenda de produtos em promoção. O sistema permite cadastrar produtos com preço de compra e venda, acompanhar o que está em estoque e registrar vendas com data automática.

## 📁 Estrutura

```
promo-vendas-api/
├── src/
│   ├── modules/
│   │   └── produtos/
│   │       ├── dto/
│   │       │   ├── create-produto.dto.ts
│   │       │   └── update-produto.dto.ts
│   │       ├── produtos.controller.ts
│   │       ├── produtos.module.ts
│   │       └── produtos.service.ts
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── app.module.ts
│   └── main.ts
├── prisma/
│   └── schema.prisma
├── docker-compose.yaml
├── .env.example
└── README.md
```