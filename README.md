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
https://github.com/Adil-Akothiat/Micro-service-TaskMng.git

## Documented source code
**auth-service**
- controller:
  const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// REGISTER NEW USER
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // CHECKING IF USER ALREADY EXISTS
    const verify_user = await User.findOne({ email });
    if (verify_user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // HASHED PASSWORD FOR SECURITY
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.insertOne({
      username,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: "User create succes", user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// LOGIN USER
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //CHECK USER EXISTS
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }
    //CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("error in password or email");
    }
    //GENERATE TOKEN AND SAVE USER INFORMATIONS
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.SECRET
    );
    res.json({ message: "Login success", token, user: req.user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// CRUD
// GET ALL USERS
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET ONE USER
const getUser = async (req, res) => {
  try {
    const userId = req.params.id
    const users = await User.findById(userId);
    if(!users)
    {
      return res.status(404).json({message : "user not found "})
    }
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//UPDATE A SPECIFIC USER
const updateUser = async (req, res) => {
  try {
    const { username, email, role } = req.body;

    if (req.user.role !== "admin" && role) {
      return res.status(400).json({ message: "Block update" });
    }

    const update_user = await User.updateOne(
      { _id: req.params.id },
      { $set: { username, email, role } }
    );

    res.json(update_user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE A SPECIFIC USER
const deleteUser = async (req, res) => {
  try {
    const delete_user = await User.deleteOne({ _id: req.params.id });


    res.json({ message: "Delete success", delete_user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//BLOCK OR UNBLOCK USER
const BlockUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.blocked = !user.blocked;
  await user.save();
  res.json({ message: `User ${user.blocked ? "bloque" : "debloque"}` });
};

//SEARCHING BY USERNAME OR EMAIL OR ROLE
const search = async (req, res) => {
  try {
    const { keyword } = req.query;
    const users = await User.find({
      $or: [
        { username: { $regex: keyword } },
        { email: { $regex: keyword } },
        { role: { $regex: keyword } },
      ],
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//EXPORTS FUNCTIONS TO USE IT ON ROUTES
module.exports = {
  register,
  login,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  BlockUser,
  search,
};






