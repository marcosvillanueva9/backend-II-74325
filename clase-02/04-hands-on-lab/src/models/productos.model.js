import mongoose from "mongoose";

const productosCollection = 'productos'

const productosSchema = new mongoose.Schema({
    nombre: String,
    precio: Number
})

const productos = mongoose.model(productosCollection, productosSchema)

export default productos