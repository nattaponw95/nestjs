
# My Wallet Application

This application provides basic wallet functionality, including deposit and withdrawal operations, built with [NestJS](https://nestjs.com/) and [Prisma ORM](https://www.prisma.io/) for MariaDB.

## Features

- User wallet management
- Deposit and withdraw functionality
- Optimistic Concurrency Control to avoid race conditions
- Row-level locking using `SELECT ... FOR UPDATE`

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 14 or above)
- [Docker](https://www.docker.com/) (if using Docker for MariaDB)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-repo/my-wallet-app.git
cd my-wallet-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up MariaDB with Docker

You can run a MariaDB instance locally using Docker. Use the following command to create and start a MariaDB container:

```bash
docker run --name mariadb-container \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=mywalletdb \
  -e MYSQL_USER=myuser \
  -e MYSQL_PASSWORD=mypassword \
  -p 3306:3306 \
  -d mariadb:latest
```

This will start a MariaDB instance with:

- `rootpassword`: Root password for MariaDB
- `mywalletdb`: The database for the application
- `myuser`: The user created in the MariaDB instance
- `mypassword`: Password for the `myuser`

### 4. Configure the `.env` file

Create a `.env` file in the root of your project and add the following configuration:

```bash
DATABASE_URL="mysql://myuser:mypassword@localhost:3306/mywalletdb"
```

- Replace `myuser`, `mypassword`, and `mywalletdb` with the corresponding values from your Docker container setup.

### 5. Run Prisma Migrations

After setting up MariaDB and configuring the `.env` file, run the Prisma migrations to create the necessary tables in the database:

```bash
npx prisma migrate dev --name init
```

### 6. Generate Prisma Client

Generate the Prisma client so the application can interact with the database:

```bash
npx prisma generate
```

### 7. Start the Application

Once everything is set up, start the NestJS application:

```bash
npm run start
```

The server should now be running at `http://localhost:3000`.

### 8. Testing API Endpoints

You can test the `deposit` and `withdraw` operations using tools like [Postman](https://www.postman.com/) or `curl`. For example:

- **Deposit** to a wallet:

  ```bash
  curl -X PUT http://localhost:3000/wallets/1/deposit \
    -H "Content-Type: application/json" \
    -d '{"amount": 100.0}'
  ```

- **Withdraw** from a wallet:

  ```bash
  curl -X PUT http://localhost:3000/wallets/1/withdraw \
    -H "Content-Type: application/json" \
    -d '{"amount": 50.0}'
  ```

### 9. Prisma Studio (Optional)

You can also inspect the database with Prisma Studio, a visual editor for your database:

```bash
npx prisma studio
```

This will launch Prisma Studio at `http://localhost:5555`, where you can view and edit the data in your MariaDB database.

## Application Architecture

This application is built using the following key technologies:

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Prisma**: A next-generation ORM that ensures a type-safe database interaction.
- **MariaDB**: A popular open-source relational database for data storage.
- **Docker**: Used to run a MariaDB containerized environment.

### How Transactions Work

This application uses **Optimistic Concurrency Control (OCC)** to avoid race conditions during concurrent updates. The `Wallet` table contains a `version` field that is incremented on every update, ensuring that conflicting transactions are handled properly.

Additionally, the application uses **row-level locking** with `SELECT ... FOR UPDATE` to ensure that a wallet is locked for modifications during `deposit` or `withdraw` operations, preventing concurrent changes.

### Example Flow: Deposit and Withdraw

- When a **deposit** or **withdraw** request is made, the wallet's current state is retrieved using `SELECT ... FOR UPDATE`, which locks the record.
- The transaction is performed, and the wallet's balance is updated.
- After the update, the `version` field is incremented to prevent other concurrent transactions from making changes with stale data.

## Available Scripts

- **`npm run start`**: Start the application
- **`npm run start:dev`**: Start the application in development mode (with hot reloading)
- **`npm run prisma migrate dev`**: Run Prisma migrations
- **`npm run prisma generate`**: Generate the Prisma client
- **`npx prisma studio`**: Start Prisma Studio to inspect the database

## Troubleshooting

- **Error: `ECONNREFUSED`**: If you encounter a connection refused error, ensure MariaDB is running and that your `DATABASE_URL` in the `.env` file is correct.
- **Docker Issues**: If you're having trouble with Docker, check that Docker is running and accessible on your machine.
- **Prisma Client Issues**: If you experience issues with Prisma, ensure that you have run `npx prisma generate` and the database is up to date with migrations.

## License

This project is licensed under the MIT License.
