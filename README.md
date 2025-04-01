# VacationFlow Backend

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

## Overview

VacationFlow Backend is a robust API service built with NestJS that powers the VacationFlow vacation management system. This application provides a comprehensive solution for managing employee vacation requests, approvals, and tracking vacation balances.

## Features

- **Employee Management**: Create, update, and retrieve employee information
- **Domain-Driven Design**: Organized using DDD principles with clear separation of concerns
- **TypeORM Integration**: PostgreSQL database integration with TypeORM
- **Validation**: Request validation using class-validator and class-transformer
- **Testing**: Comprehensive testing setup with Jest

## Project Structure

The project follows a domain-driven design approach with a clear separation of concerns:

```
src/
├── config/           # Configuration files and environment validation
├── contexts/         # Domain contexts (bounded contexts)
│   └── employee/     # Employee context
│       ├── application/      # Use cases and application services
│       ├── domain/          # Domain entities, value objects, and repositories
│       └── infrastructure/  # Infrastructure implementations
├── core/             # Core application modules
└── shared/           # Shared utilities and common code
```

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- PostgreSQL database

## Installation

```bash
# Install dependencies
$ npm install
```

## Environment Configuration

Create a `.env` file in the root directory based on the `.env.example` template:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=vacation_flow
```

## Running the Application

```bash
# Development mode
$ npm run start:dev

# Production mode
$ npm run build
$ npm run start:prod
```

The application will be available at http://localhost:3000

## Testing

```bash
# Unit tests
$ npm run test

# E2E tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov

# Create test files (helper script)
$ npm run create-test-files
```

## Development Guidelines

### Adding a New Feature

1. Create domain entities and value objects in the appropriate context
2. Implement the repository interface in the domain layer
3. Create use cases in the application layer
4. Implement the infrastructure components
5. Add controllers to expose the functionality via API
6. Write comprehensive tests

### Code Style

The project uses ESLint and Prettier for code formatting:

```bash
# Format code
$ npm run format

# Lint code
$ npm run lint
```

## API Documentation

API documentation will be available at http://localhost:3000/api when the application is running.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Write tests
5. Submit a pull request

## License

This project is [UNLICENSED](LICENSE).
