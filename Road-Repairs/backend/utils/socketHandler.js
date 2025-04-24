// socketHandler.js (Backend)
const chatController = require('../controllers/chatController');
const Chat = require('../models/chatModel');


module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('joinRoom', ({ senderId, receiverId }) => {
            const room = [senderId, receiverId].sort().join('-');
            socket.join(room);
            console.log(`User ${senderId} joined room ${room}`);
        });

        socket.on('chatMessage', async (msg) => {
            const { senderId, receiverId, content, breakdownId } = msg;
            const room = [senderId, receiverId].sort().join('-');

            try {
                const createdMessage = await chatController.createChatMessage(
                    { body: { senderId, receiverId, content, breakdownId } },
                    { status: (code) => ({ json: (data) => data }) }
                );

                console.log(createdMessage);
                
                

                if (createdMessage && createdMessage.createdAt) {
                    console.log(`Message saved and emitted to room ${room}:`, createdMessage);
                    io.to(room).emit('message', createdMessage);
                } else {
                    console.error('Failed to save or emit message: Invalid or missing createdAt');
                }

            } catch (error) {
                console.error('Error saving or emitting message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};