const User = require('../models/user');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

exports.signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const user = await User.findOne({ username: username });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const boyProfilePic = "https://avatar.iran.liara.run/public/boy";
        const girlProfilePic = "https://avatar.iran.liara.run/public/girl";
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });
        generateToken(newUser._id, res);
        await newUser.save();
        res.status(201).json({ _id: newUser._id, username: newUser.username, fullName: newUser.fullName, profilePic: newUser.profilePic });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password || "");
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        generateToken(user._id, res);
        res.status(200).json({ _id: user._id, username: user.username, fullName: user.fullName, profilePic: user.profilePic });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


exports.logout = async (req, res) => {
    try {
        res.cookie('token', '', { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}