import mongoose from 'mongoose';


// Chat History Schema
const chatHistorySchema = new mongoose.Schema(
    {
        sender: {
            type: String,
            enum: ['user', 'AI'], // Sender can only be 'user' or 'AI'
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: false } // Disable _id for subdocuments
);


const chatSchema = new mongoose.Schema({
    chatTitle: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    chatHistory: [chatHistorySchema],
}, { timestamps: true });

export const AIChatModel = mongoose.model('AIChats', chatSchema);