# Node.js API with Docker and PostgreSQL

## Project Purpose
This project was created to enhance my understanding of scalable systems and improve my Docker skills. The main objectives are:

- Learn and implement containerization best practices
- Understand microservices architecture
- Master Docker and Docker Compose for development and production environments
- Implement proper database management with migrations and seeds
- Practice API development with Node.js and Express
- Learn about environment-specific configurations

## Features
- Node.js API with Express
- PostgreSQL database
- Docker containerization
- Development and Production environments
- Database migrations and seeds
- pgAdmin for database management
- Hot-reloading in development
- Environment-specific configurations

## Project Structure
```
/meu-projeto
├── src/
│   ├── controllers/     # Business logic
│   ├── routes/         # Route definitions
│   ├── models/         # Data models
│   ├── database/       # Database configuration
│   │   ├── migrations/ # Database migrations
│   │   └── seeds/      # Seed data
│   └── server.js       # Main application file
├── docker-compose.yml
├── docker-compose.dev.yml
├── Dockerfile
├── Dockerfile.dev
└── knexfile.js
```

## Prerequisites
- Docker
- Docker Compose
- Node.js (for local development)

## Getting Started

### Development Environment
1. Clone the repository:
```bash
git clone <repository-url>
cd meu-projeto
```

2. Create environment files:
```bash
cp .env.example .env
cp .env.example .env.development
```

3. Start the development environment:
```bash
docker compose -f docker-compose.dev.yml up -d
```

4. Run migrations:
```bash
docker compose -f docker-compose.dev.yml exec api_dev npx knex migrate:latest
```

5. Run seeds:
```bash
docker compose -f docker-compose.dev.yml exec api_dev npx knex seed:run
```

### Production Environment
1. Start the production environment:
```bash
docker compose up -d
```

2. Run migrations:
```bash
docker compose exec api npx knex migrate:latest
```

## API Endpoints
- GET /api/users - List all users
- POST /api/users - Create a new user
- GET /api/users/:id - Get a specific user
- PUT /api/users/:id - Update a user
- DELETE /api/users/:id - Delete a user
- GET /api/health - Health check endpoint

## Development Tools
- **pgAdmin**: Access at http://localhost:5051 (dev) or http://localhost:5050 (prod)
  - Email: admin@email.com
  - Password: admin

## Learning Outcomes
Through this project, I aim to:
1. Master Docker containerization
2. Understand microservices architecture
3. Learn database management best practices
4. Implement proper development workflows
5. Understand environment-specific configurations
6. Practice API development with Node.js

## Future Improvements
- [ ] Add authentication and authorization
- [ ] Implement rate limiting
- [ ] Add API documentation with Swagger
- [ ] Set up CI/CD pipeline
- [ ] Add monitoring and logging
- [ ] Implement caching
- [ ] Add more complex database relationships
- [ ] Set up automated testing

## Contributing
This is a learning project, but suggestions and improvements are welcome!

## License
This project is open source and available under the MIT License. 