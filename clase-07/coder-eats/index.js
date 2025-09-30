import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import MongoConn from './src/config/db.js'

import usersRouter from './src/routes/users.router.js'
import businessRouter from './src/routes/business.router.js'
import ordersRouter from './src/routes/orders.router.js'

dotenv.config({})

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const dbConn = new MongoConn()
await dbConn.connect(process.env.MONGO_URL)

app.use('/api/users', usersRouter)
app.use('/api/business', businessRouter)
app.use('/api/orders', ordersRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})