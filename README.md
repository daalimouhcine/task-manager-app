# Task Manager App

A simple web application for managing personal tasks with user authentication.

## Features

**Current Pages:**

- **Login** - Sign in with username/password
- **Register** - Create a new account
- **Tasks** - View, create, edit, delete, and toggle task completion
- **Profile** - Display user information and task statistics

**Functionality:**

- User registration and login with JWT authentication
- CRUD operations for tasks (Create, Read, Update, Delete)
- Mark tasks as completed/pending
- Task statistics and progress tracking
- Responsive design with React and Tailwind CSS

## Project Structure

```
task-manager-app/
├── backend/                 # Spring Boot API
│   ├── src/main/java/      # Java source code
│   ├── src/test/java/      # Unit tests
│   └── pom.xml             # Maven dependencies
├── frontend/               # React application
│   ├── src/                # React components and services
│   ├── src/tests/          # Frontend tests
│   └── package.json        # NPM dependencies
├── schema.sql              # Database schema
└── docker-compose.yml      # Docker configuration
```

## Authentication

- **JWT-based authentication** with Bearer tokens
- **Protected routes** - Tasks page requires login
- **Automatic redirects** - Logged users can't access login/register
- **Token storage** - Uses localStorage for persistence
- **Password encryption** - BCrypt hashing for security

## Running Tests

**Backend (JUnit):**

```bash
cd backend
./mvnw test
```

**Frontend (Jest):**

```bash
cd frontend
yarn test
```

## Running with Docker

**Prerequisites:**

- Docker and Docker Compose installed

**Start the application:**

```bash
docker compose up --build
```

**Services will be available at:**

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080
- Database: PostgreSQL on port 5432

**Stop the application:**

```bash
docker compose down
```

## Manual Setup (without Docker)

**Backend:**

1. Install PostgreSQL and create database
2. Update `application.properties` with database credentials
3. Run: `./mvnw spring-boot:run`

**Frontend:**

1. Install dependencies: `yarn install`
2. Start dev server: `yarn dev`

## Default Users

The application starts empty. Create your account using the Register page.

## Tech Stack

- **Backend:** Spring Boot, Spring Security, JPA/Hibernate, PostgreSQL
- **Frontend:** React, TypeScript, Tailwind CSS, React Query
- **Authentication:** JWT tokens
- **Testing:** JUnit (backend), Jest (frontend)
- **Docker:** Multi-container setup with PostgreSQL
