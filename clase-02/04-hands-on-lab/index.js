import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import handlebars from 'express-handlebars'

import sessionRouter from './src/routes/sessions.router.js'
import viewsRouter from './src/routes/views.router.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/loginDB', {})

// SESSION
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/loginDB',
        collectionName: 'sessions',
        ttl: 3600
    }),
    secret: 'codersecret',
    resave: true,
    saveUninitialized: true
}))
// -----

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use('/', viewsRouter)
app.use('/api/sessions', sessionRouter)

app.listen(PORT, () => {
    console.log(`escuchando en el ${PORT}`)
})