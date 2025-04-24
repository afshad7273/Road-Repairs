    const asyncHandler = require('express-async-handler');
    const Chat = require('../models/chatModel');
    const User = require('../models/userModel');
    const Breakdown = require('../models/breakdownModel');

    const chatController = {
        createChatMessage: asyncHandler(async (req) => { // Remove res parameter
            const { senderId, receiverId, content, breakdownId } = req.body;

            const sender = await User.findById(senderId);
            const receiver = await User.findById(receiverId);
            const breakdown = await Breakdown.findById(breakdownId);

            if (!sender || !receiver || !breakdown) {
                throw new Error('Invalid sender, receiver, or breakdown ID');
            }

            const chatMessage = await Chat.create({
                sender: senderId,
                receiver: receiverId,
                content,
                breakdown: breakdownId,
            });

            if(!chatMessage){
                return res.status(401).send("Chat is not created!")
            }

            return chatMessage; // Return the chatMessage object
        }),

        getChatMessages: asyncHandler(async (req, res) => {
            const { breakdownId, userId1, userId2 } = req.params;
            const breakdown = await Breakdown.findById(breakdownId);
            
            if (!breakdown) {
                res.status(404);
                throw new Error('Breakdown not found');
            }
            

            const messages = await Chat.find({
                breakdown: breakdownId,
                $or: [{ sender: userId1, receiver: userId2 }, { sender: userId2, receiver: userId1 }],
            })
                .sort({ createdAt: 1 })
                .populate({ path: 'sender receiver', select: 'name email' });

            
            res.json(messages);
        }),

        getUserChats: asyncHandler(async (req, res) => {
            const { breakdownId, userId } = req.params;

            const breakdown = await Breakdown.findById(breakdownId);
            if (!breakdown) {
                res.status(404);
                throw new Error('Breakdown not found');
            }

            const chats = await Chat.find({
                breakdown: breakdownId,
                $or: [{ sender: userId }, { receiver: userId }],
            })
                .sort({ createdAt: 1 })
                .populate({ path: 'sender receiver', select: 'name email' });

            res.json(chats);
        }),
        

    };

    module.exports = chatController;