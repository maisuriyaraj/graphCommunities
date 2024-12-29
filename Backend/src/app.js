import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

mongoose.set('debug',true);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true
}));

app.use(express.json({limit:'20kb'}));
// TO encord URL
app.use(urlencoded({extended:true,limit:'20kb'}));
// Share Files To server
app.use(express.static("public"));
// To Parse Cookies
app.use(cookieParser());

import { authRoute } from './routes/auth.routes.js';
import mongoose from 'mongoose';
import { fetchRoute } from './routes/fetch.routes.js';
import { aiRoutes } from './routes/ai.routes.js';
// import  { createProxyMiddleware } from 'http-proxy-middleware';

// Proxy middleware for forwarding WebSocket connections
// app.use(
//     '/ai-chat',
//     createProxyMiddleware({
//       target: "http://localhost:2001", // Microservice URL
//       changeOrigin: true,
//       ws: true, // Enable WebSocket proxying
//     })
//   );

app.use('/api/v1',authRoute);
app.use('/api/fetch',fetchRoute);
app.use('/api/ai',aiRoutes);


export default app;