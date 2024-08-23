import mongoose from "mongoose";
import { CollectionMongo } from "./config.js";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model(CollectionMongo.users, userSchema);

export default UserModel;