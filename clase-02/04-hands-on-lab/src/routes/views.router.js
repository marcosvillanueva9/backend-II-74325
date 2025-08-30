import { Router } from 'express'

import { checkAuth } from '../middlewares/auth.js'
import Productos from '../models/productos.model.js'

const router = Router()

router.get('/', checkAuth({ mustBeLoggedIn: false }), (req, res) => {
    res.render('login')
})

router.get('/register', checkAuth({ mustBeLoggedIn: false }), (req, res) => {
    res.render('register')
})

router.get('/profile', checkAuth({ mustBeLoggedIn: true }), (req, res) => {
    res.render('profile', {
        user: req.session.user
    })
})

router.get('/productos', checkAuth({ mustBeLoggedIn: true }), async (req, res) => {
    try {
        const productos = await Productos.find().lean()

        res.render('productos',{
            user: req.session.user,
            productos
        })
    } catch (err) {
        console.log(err)
        res.send("error")
    }
    
})

export default router;