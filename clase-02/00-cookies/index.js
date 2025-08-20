import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cookieParser())
app.use(express.json())

app.post('/cookies', (req, res) => {
    let { clave, valor } = req.body

    res.cookie(clave, valor)

    res.json({ message: "guardado correctamente"})
})

app.get('/cookies', (req, res) => {
    res.json({
        normalCookies: req.cookies
    })
})

const PORT = 8080

app.listen(PORT, () => {
    console.log("escuchando")
})