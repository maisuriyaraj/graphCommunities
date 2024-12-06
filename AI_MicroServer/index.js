import express from 'express';
import 'dotenv/config.js'
import http from 'http';
import  { Server } from 'socket.io';
import { createAIPrompt } from './AIController/index.js';

const app = express();

const port  = process.env.PORT || 2001;

// WebSocket Server
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: 'http://localhost:3000', // Replace with your frontend URL
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
    },
});

// WebSocket connection
// Make AI-Chat Name Space for connect This Microserver to the Frontend
io.of('/ai-chat').on('connection', (socket) => {
    console.log(`[${new Date().toISOString()}] Client connected: ${socket.id} to /ai-chat`);

    socket.on('message', async (data) => {
        try {
            console.log('Message received:', data);
            const response = await createAIPrompt(data);
            socket.emit('response', `AI Response: ${response}`);
        } catch (error) {
            console.error('Error processing message:', error);
            socket.emit('response', `Error: ${error.message || 'Something went wrong!'}`);
        }
    });

    socket.on('disconnect', () => {
        console.log(`[${new Date().toISOString()}] Client disconnected: ${socket.id}`);
    });

    socket.emit('response', 'Welcome to the /ai-chat namespace!');
});


// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});