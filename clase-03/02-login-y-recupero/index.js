import express from 'express';
import exphbs from 'express-handlebars'
import mongoose from 'mongoose';

import viewsRouter from './src/routes/views.router.js'
import userRouter from './src/routes/user.router.js'

const mongourl = 'mongodb://localhost:27017/prueba-login-recupero'
mongoose.connect(mongourl, {})

const app = express()

app.engine('handlebars', exphbs.engine({
    extname: '.handlebars'
}));
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// RENDER VISTAS
app.use('/', viewsRouter)

// Controller o logica
app.use('/api/users', userRouter)

app.listen(8080, () => {
    console.log("corriendo en el 8080")
})