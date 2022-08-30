# Trybe Store Manager

**Status:** Finalizado em Junho de 2022.

<br>

## O projeto:

A API se trata de um sistema de gerenciamento de vendas em que é possível criar, visualizar, excluir e atualizar produtos e vendas.

Esse projeto foi proposto pela [Trybe](https://www.betrybe.com/) para praticar e fixar os conteúdos estudados e teve como desafio desenvolver uma RESTful API com arquitetura MSC (Model-Service-Controller) que utiliza MySQL para gerir os dados, além de testes unitários para cada camada.

:warning: **Obs:** Alguns commits e arquivos de autoria da Trybe necessários para o sistema de avaliação, como alguns testes automatizados, foram excluídos. Todos os arquivos de configuração são de autoria da Trybe, assim como os arquivos index.js, StoreManager.sql e o restoreDb.js.

<br>

## Tecnologias usadas:

Node.js com JavaScript, Express.js, SQL (MySQL), Sinon, Mocha, Chai e npm para instalar e executar dependências.

<br>

## Requisitos para executar o projeto:

Esse projeto utiliza a versão 16 do Node e a versão 5.7 do MySQL.

Para executar esse projeto em sua máquina é necessário instalar o Node.js e o MySQL.

:warning: **Obs:** Caso possua o Docker e o Docker Compose instalado em sua máquina, você pode configurar o arquivo `.env` na raiz do projeto e executar o comando `docker-compose up -d` para criar os containers de Node e MySQL.
Dessa forma será necessário instalar as dependências do projeto dentro do container (Node) utilizando o comando `docker exec -it store_manager bash` (caso utilize o VS Code, também é possível usar as extensões Remote - Containers ou Docker) para anexar o terminal da sua máquina ao terminal do container.

<br>

## Como instalar e executar o projeto:

**1) Clone o repositório em sua máquina:**
* Ex: `git clone git@github.com:nayara-vasconcelos/trybe-store-manager.git` OU `git clone https://github.com/nayara-vasconcelos/trybe-store-manager.git`

**2) Entre na pasta do projeto:**
* Ex: `cd /trybe-store-manager`

**3) Configure o arquivo .env:**
* Ex: Renomeie o arquivo `.env.example` para `.env`

---
### :warning: ATENÇÃO :warning:: Caso esteja usando Docker, lembre-se de executar os scripts (npm) no terminal do container (Node).
---

**4) Instale o projeto:**
* Ex: `npm install`

**5) Crie uma conexão com o MySQL e crie o banco de dados:**
* :warning: Caso esteja usando Docker, utilize o mesmo usuário e senha configurado no container (MySQL).
* Ex: `npm run restore`

**6) Execute a aplicação:**
* Ex: `npm start`  OU `npm run dev`

<br>

### Pronto! Agora você pode testar a aplicação na sua máquina.

:bulb: **Dica:** Você pode utilizar a extensão Thunder Client no VS Code ou instalar o Insomnia para testar as rotas.
