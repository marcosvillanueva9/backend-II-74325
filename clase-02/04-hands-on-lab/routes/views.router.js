import { Router } from 'express'

const router = Router()

function isLoggedIn(req, res, next) {
    if (!req.session.user) return res.redirect('/')
    next()
}

function isNotLoggedIn(req, res, next) {
    if (req.session.user) return res.redirect('/productos')
    next()
}

router.get('/', isNotLoggedIn, (req, res) => {
    res.render('login')
})

router.get('/register', isNotLoggedIn, (req, res) => {
    res.render('register')
})

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', {
        user: req.session.user
    })
})

router.get('/productos', isLoggedIn, (req, res) => {
    res.render('productos',{
        user: req.session.user,
        productos: [
            { nombre: "Pan", precio: 1000 },     
            { nombre: "Queso", precio: 1500 },
            { nombre: "Harina", precio: 2000 }
        ]
    })
})

export default router;