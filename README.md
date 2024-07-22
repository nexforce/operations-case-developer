# Nexforce Case Study - FullStack Application

# Breve explicação:

### Acabei fazendo no repositório pessoal, o link para o repositório é esse:
### Para ver o histórico de commits e organização das branchs.

    https://github.com/WandersonMJ/nexforce



## Descrição Geral

Este projeto consiste em uma aplicação fullstack com um backend em Node.js e um frontend em React.js. A aplicação gerencia um inventário de registros e inclui uma integração com um serviço de análise em Python.

## Backend (Node.js)
### Rotas do CRUD

As seguintes rotas foram implementadas para o CRUD (Create, Read, Update, Delete) dos itens do inventário:

    import { Router } from 'express';
    import * as inventoryController from 'controllers/inventoryController';

    const router = Router();

    router.get('/', inventoryController.getItems);
    router.get('/:id', inventoryController.getItem);
    router.post('/', inventoryController.createItem);
    router.put('/:id', inventoryController.updateItem);
    router.delete('/:id', inventoryController.deleteItem);

    export default router;

### Rota para Relatórios

A rota para geração de relatórios, que chama um script Python, foi configurada da seguinte forma:

    import { Router } from 'express';
    import { callPythonScript } from 'controllers/relatoryController';

    const router = Router();

    router.get('/', callPythonScript);

    export default router;

Essa modificação foi feita pois entendi que funcionaria melhor dessa maneira.

### Dependências

Certifique-se de ter o Python instalado no terminal onde a aplicação será executada.

### Testes

O backend está configurado com testes que cobrem todo o coverage.

## Frontend (React.js)

### Instruções de Instalação

Para instalar as dependências e rodar a aplicação no frontend, siga os passos abaixo:

    cd frontend
    npm install
    npm run dev

### Instruções de Instalação do Backend

Para instalar as dependências e rodar a aplicação no backend, siga os passos abaixo:


    cd backend
    npm install
    npm run dev

### Execução da Aplicação

Para iniciar a aplicação, entre na pasta da aplicação (frontend ou backend) e execute o comando:


    npm run dev
