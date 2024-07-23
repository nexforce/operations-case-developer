# API de Filmes

Esta API permite gerenciar uma coleção de filmes. Abaixo estão os endpoints disponíveis.

## Endpoints

### Get All Movies

#### `GET /movies`

Retorna todos os filmes.

- **Tags:** Movies
- **Resumo:** Get all movies
- **Descrição:** Este endpoint retorna todos os filmes.

**Resposta de Sucesso:**

- **Código:** 200 OK
- **Corpo:** Array de objetos Movie

**Resposta de Erro:**

- **Código:** 500 Internal Server Error
- **Corpo:** `{ message: "Descrição do erro" }`

### Get Movie by ID

#### `GET /movies/:id`

Retorna um filme pelo ID.

- **Tags:** Movies
- **Resumo:** Get a movie by ID
- **Descrição:** Este endpoint retorna um filme pelo ID.
- **Parâmetros da URL:**
  - `id` (required): ID do filme (número)

**Resposta de Sucesso:**

- **Código:** 200 OK
- **Corpo:** Objeto Movie

**Resposta de Erro:**

- **Código:** 400 Bad Request
- **Corpo:** `{ message: "ID must be a number" }`

- **Código:** 404 Not Found
- **Corpo:** `{ message: "Movie not found" }`

- **Código:** 500 Internal Server Error
- **Corpo:** `{ message: "Descrição do erro" }`

### Create a New Movie

#### `POST /movies`

Cria um novo filme.

- **Tags:** Movies
- **Resumo:** Create a new movie
- **Descrição:** Este endpoint cria um novo filme.
- **Corpo da Requisição:**
  - Exemplo:
    ```json
    {
      "name": "Nome do Filme",
      "director": "Nome do Diretor",
      "genre": "Gênero",
      "year": 2022,
      "rating": 8.5
    }
    ```

**Resposta de Sucesso:**

- **Código:** 201 Created
- **Corpo:** Objeto Movie

**Resposta de Erro:**

- **Código:** 400 Bad Request
- **Corpo:** `{ message: "Missing required fields: [fields]" }`

- **Código:** 500 Internal Server Error
- **Corpo:** `{ message: "Descrição do erro" }`

### Update a Movie by ID

#### `PUT /movies/:id`

Atualiza um filme pelo ID.

- **Tags:** Movies
- **Resumo:** Update a movie by ID
- **Descrição:** Este endpoint atualiza um filme pelo ID.
- **Parâmetros da URL:**
  - `id` (required): ID do filme (número)

- **Corpo da Requisição:**
  - Exemplo:
    ```json
    {
      "name": "Nome do Filme Atualizado",
      "director": "Nome do Diretor Atualizado",
      "genre": "Gênero Atualizado",
      "year": 2023,
      "rating": 9.0
    }
    ```

**Resposta de Sucesso:**

- **Código:** 200 OK
- **Corpo:** Objeto Movie

**Resposta de Erro:**

- **Código:** 400 Bad Request
- **Corpo:** `{ message: "ID must be a number" }`

- **Código:** 404 Not Found
- **Corpo:** `{ message: "Movie not found" }`

- **Código:** 500 Internal Server Error
- **Corpo:** `{ message: "Descrição do erro" }`

### Delete a Movie by ID

#### `DELETE /movies/:id`

Deleta um filme pelo ID.

- **Tags:** Movies
- **Resumo:** Delete a movie by ID
- **Descrição:** Este endpoint deleta um filme pelo ID.
- **Parâmetros da URL:**
  - `id` (required): ID do filme (número)

**Resposta de Sucesso:**

- **Código:** 200 OK
- **Corpo:** Objeto Movie

**Resposta de Erro:**

- **Código:** 400 Bad Request
- **Corpo:** `{ message: "ID must be a number" }`

- **Código:** 404 Not Found
- **Corpo:** `{ message: "Movie not found" }`

- **Código:** 500 Internal Server Error
- **Corpo:** `{ message: "Descrição do erro" }`