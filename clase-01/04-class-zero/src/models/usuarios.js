import mongoose from 'mongoose'

const userCollection = 'users'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true }
})

export const User = mongoose.model(userCollection, userSchema)