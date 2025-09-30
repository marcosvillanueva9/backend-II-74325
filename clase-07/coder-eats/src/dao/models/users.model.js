import mongoose from "mongoose";

const collection = 'Users'

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'business'], default: 'user'
    },
    orders: {
        type: String,
    }
})

const model = mongoose.model(collection, schema)
export default model;