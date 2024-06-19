const express = require('express');
const messageController = require('../controllers/message');
const isUserAuth = require('../middleware/isUserAuth');

const router = express.Router();

router.get('/:id', isUserAuth, messageController.receiveMessage);
router.post('/send/:id', isUserAuth, messageController.sendMessage);

module.exports = router;