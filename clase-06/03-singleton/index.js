import express from 'express'

import toysRouter from './src/router/toys.router.js'
import usersRouter from './src/router/users.router.js'

import MongoSingleton from './src/config/mongoose.js'

const app = express()
const PORT = 8080

const mongoConn = new MongoSingleton()

await mongoConn.connect('mongodb://127.0.0.1:27017') // aca lo crea

await mongoConn.connect('mongodb://127.0.0.1:27017') // aca me devuelve el ya creado

app.use(express.json())

app.use('/api/toys', toysRouter)
app.use('/api/users', usersRouter)

app.listen(PORT, () => {
    console.log(`escuchando en http://localhost:${PORT}`)
})