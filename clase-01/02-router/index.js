import express from 'express'

const app = express()

const usuarios = [
    { nombre: 'marcos', apellido: 'villanueva' },
    { nombre: 'jorge', apellido: 'albarino' }
]

app.get('/inicio', (req, res) => {
    res.send("hola! bienvenido")
})

const routerUsuario = express.Router()

routerUsuario.use(mid1)

routerUsuario.get('/', (req, res) => {
    console.log(req.dato)
    res.send(usuarios)
})

app.use('/api/usuarios', routerUsuario)

function mid1(req, res, next) {
    req.dato = "esto lo guarde desde el middleware"
    next()
}

const PORT = 8080
app.listen(PORT, () => {
    console.log("escuchando en el " + PORT)
})