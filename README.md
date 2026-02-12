# COMP 3133 – Lab Test 1  
## Real-Time Chat Application  

Student Name: Cherish Nwansi 
Student ID: 101505167  
Course: COMP 3133  
Due Date: February 11, 2026  

---

## 📌 Project Overview

This project is a real-time chat application built using:

- Node.js
- Express
- Socket.io
- MongoDB (Mongoose)
- HTML5
- CSS
- Bootstrap
- Fetch API

The application supports:

- User authentication (Signup & Login)
- Room-based messaging
- Leave Room functionality
- Real-time communication
- Typing indicator
- MongoDB message persistence
- Private message schema (for 1-to-1 chat)

---

## Features Implemented
<img width="1026" height="920" alt="Screenshot 2026-02-11 193855" src="https://github.com/user-attachments/assets/e0d55fde-86f1-4492-be21-98dc5e46ca54" />


###  1. User Authentication
- Signup page with MongoDB storage
- Unique username validation
- Login page with localStorage session management
- Logout functionality

###  2. Room-Based Messaging
- Predefined rooms (DevOps, Cloud, Covid19, Sports, NodeJS)
- Users can join only one room at a time
- Leave Room functionality implemented using `socket.leave()`
- Messages are isolated per room

###  3. Real-Time Communication
- Implemented using Socket.io
- Messages instantly delivered to users in the same room

###  4. Typing Indicator
- Displays “User is typing…” when another user is typing in the same room

###  5. MongoDB Persistence
- All group messages are stored in MongoDB
- Messages are retrieved when rejoining a room
- Messages include timestamp

###  6. Database Schemas

#### User Schema
```json
{
  "_id": "auto-generated",
  "username": "unique_username",
  "firstname": "First",
  "lastname": "Last",
  "password": "password",
  "createdOn": "Date"
}
