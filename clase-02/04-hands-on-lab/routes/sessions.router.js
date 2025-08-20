import { Router } from 'express'

const router = Router()

const users = []

router.post('/register', (req, res) => {
    const { first_name, last_name, email, age, password } = req.body

    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).send('todos los campos son requeridos')
    }

    users.push({
        first_name,
        last_name,
        email,
        age,
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

router.post('/login', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send('todos los campos son requeridos')
    }

    const user = users.find( u => u.email == email && u.password == password)
    if (!user) {
        return res.status(401).send('credenciales invalidas')
    }

    req.session.user = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age
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