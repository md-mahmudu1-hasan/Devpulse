# Devpulse

**Live URL:** https://devpulse-three-theta.vercel.app/

A modern issue tracking and management system for collaborative development teams. Devpulse enables contributors and maintainers to report bugs, request features, and manage project issues efficiently.

---

## 🎯 Features

- **User Authentication**: Secure signup and login with JWT-based authentication
- **Role-Based Access Control**: Distinguish between Contributors and Maintainers
- **Issue Management**: Create, read, update, and delete issues with different permission levels
- **Issue Categorization**: Support for bug reports and feature requests
- **Issue Tracking**: Monitor issue status and track reporter information
- **Professional Error Handling**: Standardized error response structure across the API
- **Production-Ready**: Built with TypeScript for type safety and deployed on Vercel

---

## 🛠 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** (v5.2.1) - Web framework
- **TypeScript** (v6.0.3) - Type-safe language
- **PostgreSQL** - Relational database
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment configuration

### Build & Deployment
- **tsup** - TypeScript bundler
- **tsx** - TypeScript executor for development
- **Vercel** - Hosting platform

---

## 📋 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate user and get JWT token |

**Request/Response Examples:**

**Signup:**
```json
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "role": "contributor"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "contributor"
  }
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "role": "contributor"
    }
  }
}
```

### Issues

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| `POST` | `/api/issues` | Create a new issue | ✓ | Contributor, Maintainer |
| `GET` | `/api/issues` | Get all issues | ✗ | - |
| `GET` | `/api/issues/:id` | Get issue by ID | ✗ | - |
| `PATCH` | `/api/issues/:id` | Update issue | ✓ | Contributor, Maintainer |
| `DELETE` | `/api/issues/:id` | Delete issue | ✓ | Maintainer |

**Request/Response Examples:**

**Create Issue:**
```json
POST /api/issues
Authorization: Bearer <token>

{
  "title": "Login button not working",
  "description": "The login button on the homepage doesn't respond to clicks",
  "type": "bug"
}

Response (201):
{
  "success": true,
  "message": "Issue created successfully",
  "data": {
    "id": 1,
    "title": "Login button not working",
    "description": "The login button on the homepage doesn't respond to clicks",
    "type": "bug",
    "status": "open",
    "reporter_id": 1,
    "created_at": "2024-05-24T10:30:00Z",
    "updated_at": "2024-05-24T10:30:00Z"
  }
}
```

**Get All Issues:**
```json
GET /api/issues

Response (200):
{
  "success": true,
  "message": "Issues retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "Login button not working",
      "description": "The login button on the homepage doesn't respond to clicks",
      "type": "bug",
      "status": "open",
      "reporter_id": 1,
      "created_at": "2024-05-24T10:30:00Z",
      "updated_at": "2024-05-24T10:30:00Z"
    }
  ]
}
```

### Error Response Structure

All error responses follow a standardized format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field": "error details"
  }
}
```

**Example - 400 Bad Request:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters"
  }
}
```

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT,
    role VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

**Fields:**
- `id` - Unique user identifier
- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password
- `role` - Either "contributor" or "maintainer"
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp

### Issues Table
```sql
CREATE TABLE issues (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(100),
    status VARCHAR(100) DEFAULT 'open',
    reporter_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

**Fields:**
- `id` - Unique issue identifier
- `title` - Issue title (max 150 characters)
- `description` - Detailed issue description
- `type` - Issue type ("bug" or "feature request")
- `status` - Issue status (default: "open")
- `reporter_id` - Foreign key reference to the reporting user
- `created_at` - Issue creation timestamp
- `updated_at` - Last update timestamp

---

## 🔐 User Roles

- **Contributor**: Can create, update, and view issues
- **Maintainer**: Has full permissions including issue deletion

---

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `CONNECTION_STRING` | PostgreSQL connection string |
| `NODE_ENV` | Environment (development/production) |
| `JWT_SECRET` | Secret key for JWT signing |
| `PORT` | Server port (default: 5000) |

---

## 🚀 Deployment

The project is deployed on **Vercel**. To deploy:

1. Push code to a Git repository
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Vercel automatically deploys on push to main branch

---

## 📦 Project Structure

```
src/
├── app.ts                 # Express app configuration
├── server.ts             # Server entry point
├── config/               # Configuration files
├── db/                   # Database setup and connection
├── middleware/           # Express middleware
│   ├── auth.middleware.ts
│   ├── authorizeRoles.ts
│   └── globalError.ts
├── module/
│   ├── auth/            # Authentication module
│   └── issue/           # Issue management module
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
    ├── appError.ts
    └── responseHandler.ts
```

---
