const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Signup
router.post("/signup", async (req, res) => {
    try {
        const { username, firstname, lastname, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const newUser = new User({
            username,
            firstname,
            lastname,
            password
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ 
        message: "Server error",
        error: error.message
    });
}
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
