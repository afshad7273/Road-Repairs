const express = require('express');
const router = require('./routes');
const http = require('http');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const socketHandler = require('./utils/socketHandler');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const corsOptions = {
    origin: 'http://localhost:5173', // Adjust to your frontend URL
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const io = socketIo(server, {
    cors: {
        origin: 'https://road-repairs.vercel.app', // Use the same origin as Express
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        optionsSuccessStatus: 200,
    },
});

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log('DB connected successfully');
    } catch (error) {
        console.log(error);
    }
}
connectDB();


app.use('/api/v1', router);

socketHandler(io);

app.use(errorHandler);

server.listen(4000, () => { // Use server.listen
    console.log('server is running on port 4000');
});