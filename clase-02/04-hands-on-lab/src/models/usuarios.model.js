import mongoose from "mongoose";

const usuariosCollection = 'usuarios'

const usuariosSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String,
    edad: Number,
    password: String,
})

const usuarios = mongoose.model(usuariosCollection, usuariosSchema)

export default usuarios