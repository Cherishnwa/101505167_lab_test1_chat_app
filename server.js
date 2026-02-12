require("dotenv").config();
const express = require("express");
const GroupMessage = require("./models/GroupMessage");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));

//Mongo DB connection   
mongoose.connect('mongodb://127.0.0.1:27017/chatapp')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Test route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/homepage.html");
});

// Routes
//SignUp and Login routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);



// Socket connection
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", async ({ username, room }) => {
    socket.join(room);
    console.log(`${username} joined ${room}`);

    try {
        const messages = await GroupMessage.find({ room }).sort({ date_sent: 1 });

        socket.emit("previousMessages", messages);
    } catch (error) {
        console.error("Fetch messages error:", error);
    }

    socket.on("typing", ({ username, room }) => {
    socket.to(room).emit("typing", { username });
});

socket.on("stopTyping", ({ username, room }) => {
    socket.to(room).emit("stopTyping", { username });
});

});


socket.on("previousMessages", (messages) => {
    const messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML = "";

    messages.forEach(msg => {
        messagesDiv.innerHTML += `
            <div style="margin-bottom:8px;">
                <strong>${msg.from_user}</strong>
                <small style="color:gray;">
                    (${new Date(msg.date_sent).toLocaleTimeString()})
                </small>
                <br>
                ${msg.message}
            </div>
        `;
    });

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});


    socket.on("leaveRoom", ({ username, room }) => {
        socket.leave(room);
        console.log(`${username} left ${room}`);
    });

    socket.on("chatMessage", async ({ username, room, message }) => {

    try {
        const newMessage = new GroupMessage({
            from_user: username,
            room: room,
            message: message
        });

        await newMessage.save();

        io.to(room).emit("message", {
            username,
            message,
            timestamp: newMessage.date_sent.toLocaleTimeString()
        });

    } catch (error) {
        console.error("Message save error:", error);
    }
});

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});


// Start server
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
