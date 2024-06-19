const User = require('../models/user');

exports.getUsers = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const users = await User.find({ _id: { $ne: loggedInUser } }).select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.log("Error in getUsers: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}