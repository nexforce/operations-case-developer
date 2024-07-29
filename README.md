# operations-case-developer
# Nexforce Case Study - Inventory Management Application

## Introdução

Esta é uma aplicação de gerenciamento de inventário desenvolvida como parte do case study para a posição de Desenvolvedor FullStack na Nexforce. A aplicação é composta por um backend em Node.js, um frontend em React.js e um componente de análise de dados em Python.

## Objetivos

- Criar uma aplicação Node.js que consuma APIs.
- Desenvolver um frontend em React.js.
- Integrar um serviço de análise em Python.
- Seguir princípios de desenvolvimento ágil.
- Aplicação capaz de rodar localmente ou em um serviço de cloud (GCP ou AWS).
-Testes unitarios no backend.

## Funcionalidades

- CRUD de registros de inventário.
- Filtragem de registros por categoria e faixa de preço.
- Análise de dados para identificar produtos com menor e maior estoque, além desvio padrão e o estoque_medio.
- Geração de relatórios em CSV.

## Tecnologias Utilizadas

- **Backend:** Node.js, Express.js, PostgreSQL
- **Frontend:** React.js, CSS
- **Análise de Dados:** Python
- **Infraestrutura:** GitHub Actions - CI/CD

## Como rodar a aplicação
- Clone o repositório.
- Instale as dependências do backend: `cd backend; npm install`
- Crie .env e adcione a variavel de ambiente DATABASE_URL o url do banco de dados;
- Execute as migrations do prisma: `npx prisma migrate dev`
- Rode o backend: `npm run dev`
- Instale as dependências do frontend: `cd frontend; npm install`
- Rode o frontend: `npm run start`
- Para rodar a análise de dados, instale as dependecias e execute o script: `cd script; pip install -r requirements.txt; python3 main.py`
