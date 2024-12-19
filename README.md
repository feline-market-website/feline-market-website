# Feline Market Website

FelineMarket is an commerce web application developed utilizing Next.js and Nest.js frameworks. This sophisticated platform combines cutting-edge front-end and back-end technologies to deliver a robust and efficient online marketplace experience for feline-related products and services.

## ProjectSetup

- ### Installation Requirements

  - [Node.Js](https://nodejs.org/en/)
  - [Docker](https://www.docker.com/)
  - Text Editor: [vscode](https://code.visualstudio.com/)

- ### Back-end Setup

  - Create Postgres server with Docker

    ```bash
    docker pull postgres
    ```

    ```bash
    docker run --name my-postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=adminpassword -e POSTGRES_DB=mydatabase -p 5432:5432 -d postgres
    ```

    ```bash
    docker ps
    ```

  - Go to Feline backend sever directory

    ```bash
    cd ./feline-market/
    ```

  - Setup Nest.Js environment variables by create "/.env" file

    ```bash
    PORT = "Your website server port"
    DB_HOST = "Your Database Host"
    DB_PORT = "Your Database Port"
    DB_USER_NAME = "Your Database Username"
    DB_PASS = "Your Database Password"
    DB_NAME = "Your database name or collection"
    ```

  - Install node dependencies

    ```bash
    npm install
    ```

  - Start Database migrations

    ```bash
    # This command use to generate migration files when schema has changed
    npm run migration:generate
    ```

    ```bash
    # This command use to apply migration files to current database schema
    npm run migration:run
    ```

  - Run nest.Js sever

    ```bash
    npm run start
    ```
