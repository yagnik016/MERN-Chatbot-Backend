import mongoose from "mongoose";
import { randomUUID } from "crypto";

const ChatSchema = new mongoose.Schema({
    chatId: {
        type: String,
        default:randomUUID(),
    },
    content: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
})

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    Chats:[ChatSchema]
});

const User = mongoose.model("User", UserSchema);
export default User