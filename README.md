# Backend Project - Collaborative Task Management

## Project Description
This project is a web application that enables users to manage their projects and tasks collaboratively. The application includes features for organizing, tracking, and sharing tasks among team members.

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Security:** Bcrypt
- **Containerization:** Docker, Docker Compose

## Project Structure
The project is divided into three main services:

### 1. Authentication Service (Auth-Service)
- User registration and login (using email/username and password)
- User roles: Administrator, Member, Guest (each with specific permissions)
- User management (CRUD operations)
- User blocking and unblocking
- Search users by name, email, or role

### 2. Project Management Service (Project-Service)
- CRUD operations for projects (name, description, start date, end date, status)
- Category management to organize projects
- Filtering by name, start date, end date, and status

### 3. Task Management Service (Task-Service)
- CRUD operations for tasks (title, description, priority, deadline)
- Assigning tasks to specific users
- Tracking task status (To-Do, In Progress, Completed)
- Adding comments on tasks

### Real-Time Collaboration
- Integrated chat feature to allow communication within projects and teams

## API Routes
### Auth-Service
| Route | Method | Functionality |
|---|---|---|
| `/auth/register` | POST | Register a new user |
| `/auth/login` | POST | User login |
| `/auth/users` | GET | Get all users |
| `/auth/users/:id` | GET | Get user by ID |
| `/auth/users/:id` | PUT | Update user information |
| `/auth/users/:id` | DELETE | Delete a user |

### Project-Service
| Route | Method | Functionality |
|---|---|---|
| `/project/all` | GET | Get all projects |
| `/project/:id` | GET | Get project by ID |
| `/project/create` | POST | Create a new project |
| `/project/:id` | PUT | Update project details |
| `/project/:id` | DELETE | Delete a project |

### Task-Service
| Route | Method | Functionality |
|---|---|---|
| `/task/all` | GET | Get all tasks |
| `/task/:id` | GET | Get task by ID |
| `/task/create` | POST | Create a new task |
| `/task/:id` | PUT | Update task details |
| `/task/:id` | DELETE | Delete a task |
| `/task/:id/comment` | POST | Add a comment to a task |

## Team Members
- John Doe
- Jane Smith
- Alex Brown

## How to Run the Project
_(Steps to install and run the project will be added later)_

## GitHub Repository
_(Link will be added later)_

## Additional Notes
- The project is containerized using Docker and Docker Compose for easier deployment and scalability.
- Each service runs independently, following a microservices architecture.

---

This document will be updated as the project evolves.

