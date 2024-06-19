const express = require('express');
const userController = require('../controllers/user');
const isUserAuth = require('../middleware/isUserAuth');

const router = express.Router();

// get users
router.get('/', isUserAuth, userController.getUsers);
//get user by id

//TODO: friend request

//TODO: accept friend request

//TODO: reject friend request

//TODO: remove user from friend list

//TODO: get users friend list


module.exports = router;