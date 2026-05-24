# Project Name
DevPulse - Internal Tech Issue & Feature Tracker API

# Live Url
https://assignment-02-eta-taupe.vercel.app

# Tech Stack

- Backend: Node.js, Express.js
- Language: TypeScript
- Database: PostgreSQL
- Authentication: JSON Web Token (JWT)
- Validation & Errors: Custom AppError handling
- Security: Role-based access control (RBAC)
- Tools: pg (node-postgres), dotenv, ts-node-dev

# Features
Authentication & Authorization

- User login with JWT
- Role-based access:
- Contributor
- Maintainer
- Protected routes using middleware

# Issue Management
- Create issue
- Get all issues
- Get issue by ID
- Update issue (RBAC controlled)
- Delete issue
- Status tracking (open, in_progress, closed)

# Role Rules
- Maintainer
Full access to all issues
- Contributor
Can update only their own issues
Only allowed when issue status is open

# Error Handling
- Centralized global error handler
- Custom AppError class
- Proper HTTP status codes:
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 500 Server Error
 
#  API Endpoint List

🔐 Auth
- Method	Endpoint	     Description

- POST	  /api/auth/login	  User login
- POST	  /api/auth/signup	  Create user

📌 Issues
- Method	Endpoint	      Description
   
- POST	  /api/issues	       Create issue
- GET	  /api/issues	       Get all issues
- GET	  /api/issues/:id	   Get issue by ID
- PUT	  /api/issues/:id	   Update issue
- DEL     /api/issues/:id	   Delete issue