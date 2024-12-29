// import dotenv from 'dotenv';
// import app from "./app.js";
// import connectDatabase from "./db/db.connection.js";

// dotenv.config();

// const port = process.env.PORT || 8080;

// connectDatabase().then(()=>{
//     app.listen(port,()=>{
//         console.log("Server Started on PORT : " , port);
//     });
// }).catch((error)=>{
//     console.log("CONNECTION ERROR  12093: ",error);
// });

import dotenv from 'dotenv';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io'; // Import Socket.IO server
import app from './app.js';
import connectDatabase from './db/db.connection.js';
import { createAIPrompt, createChatRoom } from './controller/AI.controller.js';

dotenv.config();

const port = process.env.PORT || 8080;

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new SocketIOServer(server, {
    cors: {
        origin: 'http://localhost:3000', // Your client URL
        credentials: true,
    },
});

// Database connection
connectDatabase()
    .then(() => {
        // Start the HTTP server
        server.listen(port, () => {
            console.log('Server Started on PORT:', port);

            // Handle Socket.IO connections
            io.on('connection', (socket) => {
                console.log('A client connected:', socket.id);

                // Listen for custom events
                socket.on('message', ({roomId,token,prompt}) => {
                    try{
                        createAIPrompt({roomId,token,prompt},socket);
                    }catch(error){
                        console.error('Error in createRoom event:', error);
                        socket.emit('error', { message: 'Failed to create the chat room.' });
                    }

                    // // Emit a response to the client
                    // socket.emit('response', { message: 'Message received!' });
                });

                // Handle room creation
                socket.on('createRoom', async ({ roomId, token, chatTitle }) => {
                    try {
                        createChatRoom({ roomId, token, chatTitle }, socket);
                    } catch (error) {
                        console.error('Error in createRoom event:', error);
                        socket.emit('error', { message: 'Failed to create the chat room.' });
                    }
                });

                // Handle client disconnection
                socket.on('disconnect', () => {
                    console.log('Client disconnected:', socket.id);
                });
            });
        });
    })
    .catch((error) => {
        console.log('CONNECTION ERROR 12093:', error);
    });

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Shutting down...');
    server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
    });
});
