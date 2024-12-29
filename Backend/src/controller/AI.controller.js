import jwt from "jsonwebtoken";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIChatModel } from "../models/AiChat.model.js";
import { userModel } from "../models/users.model.js";
import APIResponse from "../utils/apiResponse.js";

const apiKey = process.env.GOOGLE_API_KEY || "AIzaSyBJ0_jBbC18Ox37P9R8nACpjVy4VN5HLgI";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


// export async function createAIPrompt({roomId,token,prompt},socket) {
//     try {
//         // Validate and decode the JWT token
//         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECREATE);
//         if(!decodedToken) throw new Error("Invalid Token");

//         // Save User Prompt In DB
//         const userPrompt = { sender: 'user', message: prompt };
//         await AIChatModel.findOneAndUpdate({uuid : roomId},{ $push: { chatHistory: userPrompt } },{ new: true });

//         const result = await model.generateContent(prompt);

//         const aiResponse = { sender: 'AI', message: result?.response?.candidates[0]?.content?.parts[0]?.text };
//         const uppdatedPrompts = await AIChatModel.findOneAndUpdate({uuid : roomId},{ $push: { chatHistory: aiResponse } },{ new: true });

//         socket.emit('response', uppdatedPrompts);
//     } catch (error) {
//         console.log("AI Response Error ", error);
//     }
// }

export async function createAIPrompt({ roomId, token, prompt }, socket) {
    try {
        // Validate input data
        if (!roomId || !token || !prompt) {
            throw new Error("Missing required parameters: roomId, token, or prompt");
        }

        // Validate and decode the JWT token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECREATE);
        if (!decodedToken) throw new Error("Invalid Token");

        // Check if room exists
        const room = await AIChatModel.findOne({ uuid: roomId });
        if (!room) {
            throw new Error("Chat room not found");
        }

        // Save user prompt in DB
        const userPrompt = { sender: 'user', message: prompt };
        const updateProms = await AIChatModel.findOneAndUpdate(
            { uuid: roomId },
            { $push: { chatHistory: userPrompt } },
            { new: true }
        );

        // Emit updated chat history to frontend
        socket.emit('response', updateProms);

        // Generate AI content
        const result = await model.generateContent(prompt);
        if (!result || !result.response?.candidates || result.response.candidates.length === 0) {
            throw new Error("AI response is empty or invalid");
        }

        // Save AI response in DB
        const aiResponse = { sender: 'AI', message: result.response.candidates[0]?.content?.parts[0]?.text };
        const updatedPrompts = await AIChatModel.findOneAndUpdate(
            { uuid: roomId },
            { $push: { chatHistory: aiResponse } },
            { new: true }
        );

        // Emit updated chat history to frontend
        socket.emit('response', updatedPrompts);
    } catch (error) {
        console.error("AI Response Error:", error);
        socket.emit('error', { message: error.message });
    }
}

export const createChatRoom = async ({ roomId, token, chatTitle }, socket) => {
    try {
        // Validate and decode the JWT token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECREATE);

        // Find the user by ID from the decoded token
        const user = await userModel.findById(decodedToken._id);
        if (!user) throw new Error('User not found');

        // Create a new chat room in the database
        const newChatRoom = new AIChatModel({
            uuid: roomId,
            chatTitle: chatTitle || 'New Conversation',
            user: user._id,
            chatHistory: [],
        });

        await newChatRoom.save();

        const allChatRooms = await AIChatModel.find({ user: user._id }).sort({ updatedAt: -1 });

        // Emit an event to notify clients about the new room
        socket.emit('roomCreated', allChatRooms);
    } catch (error) {
        console.error('Error creating chat room:', error);
        socket.emit('error', { message: 'Failed to create the chat room.' });
    }
};
export const getUserChatRooms = async (request, response) => {
    try {
        const {user_id} = request; 
        // Fetch all chat rooms for the user
        const chatRooms = await AIChatModel.find({ user: user_id }).sort({ updatedAt: -1 });
        return response.status(201).json(new APIResponse(201,chatRooms,"Questions Fetched Successfully !"));
    } catch (error) {
        console.error('Error fetching user chat rooms:', error);
        return response.status(500).json({ message: 'Failed to fetch chat rooms.' });
    }
};