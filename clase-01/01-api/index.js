import express from 'express'

const app = express()

const usuarios = [
    { nombre: 'marcos', apellido: 'villanueva' },
    { nombre: 'jorge', apellido: 'albarino' }
]

app.use(mid1)

app.get('/api/usuarios', (req, res) => {
    console.log(req.dato)
    res.send(usuarios)
})

app.get('/otracosa', (req, res) => {

})

function mid1(req, res, next) {
    req.dato = "esto lo guarde desde el middleware"
    next()
}

const PORT = 8080
app.listen(PORT, () => {
    console.log("escuchando en el " + PORT)
})