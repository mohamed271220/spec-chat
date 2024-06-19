const Conversation = require('../models/conversation');
const Message = require('../models/message');

exports.sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const { message } = req.body;
        const senderId = req.user._id;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        if (newMessage) {
            conversation.messages.push(newMessage);
        }


        // SOCKET IO 

        // await conversation.save();
        // await newMessage.save();
        // to optimize the code, you can use the following code instead of the above two lines
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(200).json(newMessage);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
}

exports.receiveMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate('messages');
        if (!conversation) {
            return res.status(200).json([]);
        }
        res.status(200).json({ messages: conversation.messages });
    } catch (error) {
        console.log("Error in receiveMessage controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}