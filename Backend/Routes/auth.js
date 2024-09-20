const express = require('express')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

require('dotenv').config();

const authRouter = express.Router()


const SECRET_KEY = process.env.SECRET_KEY


const User = require('../Models/userSchema')

authRouter.post("/signup", async (req, res) => {
    const { Name, Phone_no, email, password, location, area, crop } = req.body;

    const hashPassword = await bcrypt.hash(password, 10)
    const user = new User({
        Name,
        Phone_no, email, password: hashPassword, location, area, crop
    })
    await user.save()

    const id = user._id
    const token = jwt.sign({ id }, SECRET_KEY)
    const cookie = res.cookie("token", token)
    res.cookie = cookie
    console.log(id)
    res.status(200).json({ message: "successfully signed in", data: user })
})

authRouter.post("/login", async (req, res) => {
    const { Name, email, Phone_no, password } = req.body;

    if (!Name && !email && !Phone_no) {
        return res.status(400).json({ error: "Please provide at least one of the following: Name, email, or Phone number" });
    }

    try {
        const query = {};
        if (Name) query.Name = Name;
        if (email) query.email = email;
        if (Phone_no) query.Phone_no = Phone_no;

        const user = await User.findOne(query);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const id = user._id
        const token = jwt.sign({ id }, SECRET_KEY)
        const cookie = res.cookie("token", token)
        res.cookie = cookie

        res.status(200).json({ message: "Successfully logged in!", user });
    } catch (err) {
        res.status(500).json({ error: "An error occurred during login", details: err.message });
    }
});

authRouter.post("/logout", async (req, res) => {
    try {
        res.cookie("token", null, { 
            expires: new Date(0),  // Expire the cookie immediately
       
        });
        res.status(200).send("Logged out successfully");
    } catch (error) {
        res.status(500).send("Error logging out: " + error);
    }
});




module.exports = authRouter