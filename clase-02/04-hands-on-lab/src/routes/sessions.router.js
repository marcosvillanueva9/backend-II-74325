import { Router } from 'express'

import Usuarios from '../models/usuarios.model.js'

const router = Router()

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body

    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).send('todos los campos son requeridos')
    }

    const user = await Usuarios.findOne({email})
    if (user) {
        return res.status(400).send('el email ya existe', user)
    }

    await Usuarios.create({
        nombre: first_name,
        apellido: last_name,
        email,
        edad: age,
        password
    })

    req.session.user = {
        first_name,
        last_name,
        email,
        age
    }

    res.redirect('/profile')
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send('todos los campos son requeridos')
    }

    const user = await Usuarios.findOne({email})
    if (!user) {
        return res.status(401).send('credenciales invalidas')
    }

    if (user.password !== password) {
        return res.status(401).send('credenciales invalidas')
    }

    req.session.user = {
        first_name: user.nombre,
        last_name: user.apellido,
        email: user.email,
        age: user.edad
    }

    res.redirect('/profile')
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('error al cerrar sesion')
        }
        res.redirect('/')
    })
})

export default router;