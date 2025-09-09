import express from 'express';
import sessionRouter from './src/routes/session.router.js'
import UserRouter from './src/routes/user.router.js'

const app = express()
const PORT = 8080

app.use(express.json())

const usersRouter = new UserRouter()

app.use('/api/session', sessionRouter)
app.use('/api/users', usersRouter.getRouter())

app.listen(PORT, () => {
    console.log('escuchando en ', PORT)
})