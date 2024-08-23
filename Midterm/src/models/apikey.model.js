import mongoose from "mongoose";
import { CollectionMongo } from "./config.js";

const apiKeySchema = new mongoose.Schema({
    randomString: String,
    userId: String,
    userName: String
});

const ApiKeyModel = mongoose.model(CollectionMongo.apikey, apiKeySchema);

export default ApiKeyModel;