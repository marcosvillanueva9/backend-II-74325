import express from 'express'
import mongoose from 'mongoose'

import usuariosRouter from './src/routes/usuarios.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const mongourl = 'mongodb://localhost:27017/class-zero'

mongoose.connect(mongourl, {})

// definir las rutas
app.use('/api/users', usuariosRouter)

app.listen(PORT, () => {
    console.log("escuchando en el " + PORT)
})