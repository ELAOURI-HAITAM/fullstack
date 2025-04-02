# Backend Project - Collaborative Task Management
## MEMBERS
- AKOTHIAT ADIL
- ELAOURI HAITAM
- BEL ACHHAB EL KHADER ABDELMOIZ
## Project Description
This project is a web application that enables users to manage their projects and tasks collaboratively. The application includes features for organizing, tracking, and sharing tasks among team members.

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Security:** Bcrypt , json web token
- **Containerization:** DockerFile, Docker Compose

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
### Auth-Service BY ABDELMOIZ EL KHADER BEL ACHHAB
| Route | Method | Functionality |
|---|---|---|
| `/User/register` | POST | Register a new user |
| `/User/login` | POST | User login |
| `/User/users` | GET | Get all users |
| `/User/users/:id` | GET | Get user by ID |
| `/User/users/:id` | PUT | Update user information |
| `/User/users/:id` | DELETE | Delete a user |
| `/User/block/:id` | PATCH  | Block or Unblock a user |
| `/User/search` | GET  | Search by name,email or role |

### Project-Service BY ELAOURI HAITAM
| Route | Method | Functionality |
|---|---|---|
| `/project/all` | GET | Get all projects |
| `/project/:id` | GET | Get project by ID |
| `/project/create` | POST | Create a new project |
| `/project/:id` | PUT | Update project details |
| `/project/:id` | DELETE | Delete a project |
| `/project/categ` | POST  | Create new Category |
| `/project/filter` | GET  | Filter by name,date_debut,date_fin and status |

### Task-Service BY ADIL AKOTHIAT
| Route | Method | Functionality |
|---|---|---|
| `/task/tasks` | GET | Get all tasks |
| `/task/:id` | GET | Get task by ID |
| `/task/create` | POST | Create a new task |
| `/task/:id` | PUT | Update task details |
| `/task/:id` | DELETE | Delete a task |
| `/task/UserTask` | POST | Assigning tasks to specific users. |
| `/task/comment` | POST | Adding comment on a task. |

### CHAT
| Route | Method | Functionality |
|---|---|---|
| `/chat/message` | POST | Send Messages |
| `/chat/:room` | GET | Get Messages by room |
| `/chat/:chatId` | DELETE | Delete specific Message by id |
| `/chat/:chatId` | PATCH | Modify specific Message by id |

## GitHub Repository
https://github.com/ELAOURI-HAITAM/BACKEND_PROJECT.git










