import express from 'express'
import mongoose from 'mongoose'

import usuariosRouter from './src/routes/usuarios.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const mongourl = 'mongodb://localhost:27017/prueba74325'

mongoose.connect(mongourl, {})

// definir las rutas
app.use('/api/usuarios', usuariosRouter)

app.listen(PORT, () => {
    console.log("escuchando en el " + PORT)
})