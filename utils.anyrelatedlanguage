# Cloud-Based Student Record Management System

A MERN Stack web application for managing student records using MongoDB Atlas, Express.js, React.js, and Node.js. The application supports CRUD operations including adding, updating, deleting, and retrieving student data.

---

# Project Architecture

Frontend (React + Vite)
↓
Backend API (Node.js + Express)
↓
MongoDB Atlas Database

Hosted On:
- AWS EC2 Instance
- MongoDB Atlas Cloud Database

---

# Features

- Add Student Records
- Update Student Details
- Delete Student Records
- Retrieve Student Data
- MongoDB Atlas Integration
- REST API Backend
- React Frontend
- EC2 Deployment
- PM2 Process Management

---

# Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend UI |
| Vite | Frontend Build Tool |
| Node.js | Runtime Environment |
| Express.js | Backend API |
| MongoDB Atlas | Cloud Database |
| Mongoose | MongoDB ODM |
| PM2 | Process Manager |
| AWS EC2 | Cloud Hosting |
| GitHub | Source Code Hosting |

---

# Folder Structure

```text
student-management/
│
├── backend/
│   ├── models/
│   ├── server.js
│   ├── package.json
│   ├── .env
│
├── frontend/
│   ├── src/
│   ├── dist/
│   ├── package.json
│   ├── .env
│
└── README.md
```

---

# Local Setup Instructions

# Step 1: Clone Repository

```bash
git clone https://github.com/BaviskarMahesh/student-management.git
```

```bash
cd student-management
```

---

# Backend Setup

## Step 2: Navigate to Backend

```bash
cd backend
```

## Step 3: Install Dependencies

```bash
npm install
```

---

# MongoDB Atlas Setup

## Step 4: Create MongoDB Atlas Account

Visit:

https://www.mongodb.com/cloud/atlas

---

## Step 5: Create Cluster

- Create Free Shared Cluster
- Select Cloud Provider
- Create Database User
- Set Username and Password

---

## Step 6: Add Network Access

Go to:

Network Access → Add IP Address

Add:

```text
0.0.0.0/0
```

Purpose:
Allows all IPs including EC2 instance to access MongoDB Atlas.

---

## Step 7: Get Connection String

Example:

```env
mongodb+srv://USERNAME:PASSWORD@cluster0.mongodb.net/studentdb
```

---

# Backend Environment Variables

## Step 8: Create `.env`

Inside backend folder:

```bash
nano .env
```

Add:

```env
PORT=5002
MONGO_URI=your_mongodb_connection_string
NODE_ENV=production
```

Save:
- CTRL + O
- Enter
- CTRL + X

---

# Backend Server Code

## server.js

```javascript
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./models/Student');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single student
app.get('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create student
app.post('/api/students', async (req, res) => {
  const student = new Student(req.body);

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update student
app.put('/api/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedStudent)
      return res.status(404).json({ message: 'Student not found' });

    res.json(updatedStudent);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent)
      return res.status(404).json({ message: 'Student not found' });

    res.json({ message: 'Student deleted successfully' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Handle React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});
```

---

# Frontend Setup

## Step 9: Navigate to Frontend

```bash
cd ../frontend
```

---

## Step 10: Install Dependencies

```bash
npm install
```

---

# Frontend Environment Variables

## Step 11: Create `.env`

```bash
nano .env
```

Add:

```env
VITE_API_URL=http://localhost:5002/api/students
```

---

# Run Application Locally

# Backend

```bash
cd backend
npm run dev
```

Expected Output:

```text
Connected to MongoDB
Server is running on port 5002
```

---

# Frontend

```bash
cd frontend
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# AWS EC2 Deployment

# Step 1: Launch EC2 Instance

Go to AWS EC2 Console.

Select:
- Ubuntu Server
- t2.micro instance

---

# Step 2: Configure Security Group

Add Inbound Rules:

| Type | Port | Source |
|---|---|---|
| SSH | 22 | My IP |
| HTTP | 80 | Anywhere |
| HTTPS | 443 | Anywhere |
| Custom TCP | 5002 | Anywhere |

Purpose:
- SSH → Remote access
- HTTP/HTTPS → Website access
- 5002 → Backend API access

---

# Step 3: Connect to EC2

```bash
chmod 400 student-key.pem
```

```bash
ssh -i student-key.pem ubuntu@YOUR_PUBLIC_IP
```

---

# Step 4: Install NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

```bash
source ~/.bashrc
```

---

# Step 5: Install Node.js

```bash
nvm install 22
```

```bash
nvm alias default 22
```

Verify:

```bash
node -v
npm -v
```

---

# Step 6: Clone Repository

```bash
git clone https://github.com/BaviskarMahesh/student-management.git
```

```bash
cd student-management
```

---

# Step 7: Backend Installation

```bash
cd backend
npm install
```

Create `.env`:

```bash
nano .env
```

Add:

```env
PORT=5002
MONGO_URI=your_mongodb_connection_string
NODE_ENV=production
```

---

# Step 8: Frontend Installation

```bash
cd ../frontend
npm install
```

Create `.env`:

```bash
nano .env
```

Add:

```env
VITE_API_URL=http://YOUR_PUBLIC_IP:5002/api/students
```

---

# Step 9: Build Frontend

```bash
npm run build
```

Creates:

```text
frontend/dist
```

---

# Step 10: Install PM2

```bash
npm install -g pm2
```

---

# Step 11: Start Backend

```bash
cd ../backend
```

```bash
pm2 start server.js --name backend
```

---

# Step 12: Check PM2 Status

```bash
pm2 status
```

---

# Step 13: View Logs

```bash
pm2 logs backend
```

---

# Step 14: Save PM2 Process

```bash
pm2 save
```

---

# Step 15: Enable Auto Startup

```bash
pm2 startup
```

Run generated command.

Then:

```bash
pm2 save
```

---

# Access Application

Frontend:

```text
http://YOUR_PUBLIC_IP:5002
```

API:

```text
http://YOUR_PUBLIC_IP:5002/api/students
```

---

# Useful PM2 Commands

## Restart Backend

```bash
pm2 restart backend
```

## Stop Backend

```bash
pm2 stop backend
```

## Delete Backend Process

```bash
pm2 delete backend
```

## View Logs

```bash
pm2 logs backend
```

## List Processes

```bash
pm2 list
```

---

# Common Errors and Fixes

# MongoDB Authentication Failed

Reason:
Wrong username/password.

Fix:
- Reset MongoDB password
- Update `.env`

---

# MongoDB IP Not Whitelisted

Error:

```text
Could not connect to any servers in your MongoDB Atlas cluster
```

Fix:
Add:

```text
0.0.0.0/0
```

in MongoDB Atlas Network Access.

---

# Frontend Not Loading Data

Reason:
Incorrect API URL.

Fix frontend `.env`:

```env
VITE_API_URL=http://YOUR_PUBLIC_IP:5002/api/students
```

Then rebuild:

```bash
npm run build
```

---

# PM2 Command Not Found

Install PM2:

```bash
npm install -g pm2
```

---

# Port Already In Use

Find process:

```bash
lsof -i :5000
```

Kill process:

```bash
kill -9 PID
```

---

# Final Deployment Checklist

- EC2 Instance Created
- Security Rules Configured
- MongoDB Atlas Configured
- Backend Installed
- Frontend Built
- PM2 Running
- API Accessible
- CRUD Operations Working
- Application Live

---

# Author

Mahesh Baviskar

GitHub Repository:
https://github.com/BaviskarMahesh/student-management
