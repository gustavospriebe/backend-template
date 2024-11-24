# Backend Template

A robust Node.js/TypeScript backend template with built-in support for Fastify, PostgreSQL, Docker, and comprehensive testing setup.

## Features

- 🚀 **Fastify** - High-performance web framework
- 🔒 **JWT Authentication** - Built-in JWT support
- 📝 **TypeScript** - Type safety and better developer experience
- 🐳 **Docker** - Containerization support
- 🐘 **PostgreSQL** - Database support using Kysely
- ✅ **Testing** - Vitest setup with example tests
- 🔍 **ESLint** - Code quality and consistency
- 🚦 **Rate Limiting** - Built-in API rate limiting
- 🔄 **CI/CD** - GitHub Actions workflow for testing and linting
- ⚡ **Hot Reload** - Development with tsx watch

## Prerequisites

- Node.js 20.x
- Yarn
- Docker and Docker Compose (for containerized development)
- PostgreSQL (if running locally)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
NODE_ENV=development

APP_PORT=8000

DATABASE_URL=postgresql://user:password@localhost:5432/myapp

JWT_SECRET=your-secret-key
```

## Installation

1. Clone the repository
2. Install dependencies:

```bash
yarn install
```

## Development

### Running locally

```bash
# Start the development server with hot reload
yarn dev
# Run tests
yarn test
# Run linting
yarn lint
```

### Using Docker

```bash
# Start the application and database
yarn docker:start
# Start in detached mode
yarn docker:start:detach
# View logs
yarn docker:logs
# Stop containers
yarn docker:stop
```

## Database

The project uses Kysely as the SQL query builder and PostgreSQL as the database.

### Migrations

Run database migrations:

```bash
yarn migrate
```

## Testing

The project uses Vitest for testing. Run tests with:

```bash
yarn test
```

## API Routes

### Health Check

- `GET /app/health-check`: Check if the API is running

## Project Structure

├── src/

│ ├── app.ts # Application entry point

│ ├── config/ # Configuration files

│ ├── controllers/ # Route controllers

│ ├── database/ # Database related files

│ ├── routes/ # API routes

│ ├── types/ # TypeScript type definitions

│ └── utils/ # Utility functions

├── tests/ # Test files

├── docker/ # Docker configuration

└── .github/ # GitHub Actions workflows

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
