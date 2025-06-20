Pokédex Web Application

Uma aplicação web full-stack para gerenciamento de Pokémon e seus tipos, construída com um frontend em React e um backend em Node.js. Permite visualizar, filtrar, adicionar, editar e excluir Pokémon, além de gerenciar tipos, com uma interface amigável estilizada com Tailwind CSS.
Índice

1. Visão Geral

A Pokédex Web Application é uma ferramenta para gerenciar dados de Pokémon, incluindo nomes, tipos primário e secundário, e IDs. Os usuários podem interagir com uma lista de Pokémon, filtrá-los por nome ou tipo, adicionar novos Pokémon, editar ou excluir existentes, e gerenciar tipos de Pokémon. O frontend utiliza React com TypeScript, React Router para navegação e Axios para comunicação com a API. O backend (presumido como Node.js) oferece endpoints RESTful para operações CRUD em Pokémon e tipos.
Funcionalidades

    Lista de Pokémon (HomePage.tsx):
        Exibe uma tabela com ID, Nome, Tipo Primário, Tipo Secundário e Ações (Editar/Excluir).
        Filtros por nome (insensível a maiúsculas/minúsculas) e tipo (dropdown com opções como Grass, Fire, etc.).
        Gerencia estados de carregamento e erros com feedback visual.
        Permite excluir Pokémon via requisição DELETE.
        Suporta edição via prompts (a ser aprimorado com formulário).
    Formulário de Adição de Pokémon (AddPokemon.tsx):
        Campos:
            ID: Numérico, gerado automaticamente (max(id) + 1), somente leitura.
            Nome: String, obrigatório.
            Tipo Primário: Dropdown, obrigatório.
            Tipo Secundário: Dropdown, opcional.
        Envia dados via POST ao backend.
        Valida campos obrigatórios e exibe erros.
        Redireciona para a página inicial após sucesso, sincronizando o novo Pokémon.
    Formulário de Gerenciamento de Tipos (TypeManagement.tsx):
        Campos:
            ID: Numérico, gerado automaticamente, somente leitura.
            Nome: String, obrigatório.
        Envia dados via POST ao backend.
        Valida campos obrigatórios e exibe erros.
        Redireciona para a página inicial após sucesso.
    Navegação:
        Usa React Router para transições entre Home (/), Adicionar Pokémon (/add-pokemon) e Gerenciar Tipos (/type).
        Botões de ação (Adicionar Pokémon, Gerenciar Tipos, Cancelar) para navegação intuitiva.
    Interface Responsiva:
        Estilizada com Tailwind CSS, com fundos gradientes, cards arredondados e efeitos de hover.
        Mensagens de erro em alertas estilizados.
    Sincronização em Tempo Real:
        Novos Pokémon e tipos são adicionados ao estado do frontend sem recarregar a página, usando state do React Router.

2.  Tecnologias
    2.1. Frontend

        React: Biblioteca para construção de interfaces.
        TypeScript: Tipagem estática para maior robustez.
        React Router: Roteamento no lado do cliente (BrowserRouter, Routes, Route, useNavigate, useLocation).
        Axios: Requisições HTTP ao backend.
        Tailwind CSS: Framework CSS utilitário para estilização.
        Vite: Ferramenta de build e servidor de desenvolvimento.

    2.2. Backend (Presumido)

    Node.js: Ambiente de execução do servidor.
    Express: Framework para rotas RESTful.
    Banco de Dados: PostgreSQL

Ferramentas de Desenvolvimento

    yarn: Gerenciador de pacotes.
    VS Code: IDE recomendada com suporte a TypeScript e Tailwind CSS.

3.  Estrutura do Projeto
    plaintext
    ├── src/
    │ ├── views/
    │ │ ├── HomePage.tsx # Lista de Pokémon com filtros
    │ │ ├── AddPokemon.tsx # Formulário para adicionar Pokémon
    │ │ ├── TypeManagement.tsx # Formulário para adicionar tipos
    │ ├── App.tsx # Configuração de rotas
    │ ├── index.css # Estilos globais (Tailwind)
    │ ├── main.tsx # Ponto de entrada do React
    ├── public/ # Arquivos estáticos
    ├── vite.config.ts # Configuração do Vite
    ├── tsconfig.json # Configuração do TypeScript
    ├── package.json # Dependências e scripts
    ├── README.md # Documentação
    Instruções de Configuração
    Pré-requisitos

        Node.js: Versão 18 ou superior.

        yarn: 1.22.22 ou superior
        Backend: Servidor executando em http://localhost:3003 com endpoints /pokemon e /type.
        Banco de Dados: Configurado e acessível pelo backend.

4.  Instalação

Clone o repositório:

```bash
git clone
```

cd pokedex-web-app
Instale as dependências:

```bash
yarn
```

Configure o ambiente:

    Verifique se a API backend está em http://localhost:3003.
    Se a URL for diferente, atualize as requisições Axios em HomePage.tsx, AddPokemon.tsx e TypeManagement.tsx. Considere usar uma variável de ambiente (e.g., .env com VITE_API_URL=http://localhost:3003).

4.1 Inicie o servidor de desenvolvimento:

```bash
yarn dev
```

    Acesse em http://localhost:9999 (ou porta configurada pelo Vite).

Build para produção:

```bash
yarn build # Gera assets otimizados em dist/.
```

4.2 Configuração do Backend

    Certifique-se de que o backend suporta:
        Pokémon: GET/POST/PUT/DELETE /pokemon.
        Tipos: GET/POST /type.
    Verifique se o servidor está ativo em http://localhost:3003.

Uso
Visualizar Pokémon

    Acesse / para ver a lista de Pokémon.
    Use o campo de texto para filtrar por nome (e.g., “Pikachu”).
    Use o dropdown para filtrar por tipo (e.g., “Electric”).
    Clique em “Editar” para atualizar via prompts.
    Clique em “Deletar” para remover um Pokémon.

Adicionar Pokémon

    Clique em “Adicionar Pokemon” para ir a /add-pokemon.
    O ID é gerado automaticamente (somente leitura).
    Preencha Nome, Tipo Primário e, opcionalmente, Tipo Secundário.
    Clique em “Adicionar Pokémon” para salvar ou “Cancelar” para voltar.

Gerenciar Tipos

    Clique em “Gerenciar Tipo” para ir a /type.
    O ID é gerado automaticamente (somente leitura).
    Insira o Nome do tipo.
    Clique em “Adicionar Tipo” para salvar ou “Cancelar” para voltar.

5.  Endpoints da API
    5.1 Pokémon

        GET /pokemon
            Retorna: [{ id: number, name: string, type1: string, type2: string|null }, ...]
        POST /pokemon
            Payload: { id: number, name: string, type1: string, type2: string|null }
        PUT /pokemon/:id
            Payload: { name: string, type1: string, type2: string|null }
        DELETE /pokemon/:id

    5.2 Tipos

        GET /type
          Retorna: [{ id: number, name: string }, ...]
        POST /type
          Payload: { id: number, name: string }

Nota: Se o backend gera IDs automaticamente, omita id nos payloads POST.
Melhorias Futuras

    Substituir prompts de edição por formulários modais.
    Adicionar validação de tipos duplicados no backend.
    Sincronizar dropdown de tipos dinamicamente com GET /type.
    Implementar autenticação para restringir ações.
    Adicionar testes unitários (Jest) e de integração (Cypress).
    Suportar paginação na lista de Pokémon.
    Melhorar UX com spinners, animações e mensagens detalhadas.
