import express from 'express'
import bcrypt from 'bcrypt'

const users = []

const app = express()
app.use(express.json())

// validaciones
const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)
// ------------

app.post('/login', (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json("falta algun dato")
    }

    const user = users.find(u => u.username === username)
    if (!user) {
        return res.status(404).json("no existe ese username")
    }

    if (!isValidPassword(user, password)) {
        return res.status(401).json("password incorrecta")
    }

    res.status(200).json({ message: "usted se logueo correctamente" })
})

app.post('/register', (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json("falta algun dato")
    }

    const hashedPassword = createHash(password)
    console.log(hashedPassword)
    users.push({username, password: hashedPassword})

    res.status(201).json({username, message: "creado correctamente"})
})

app.get('/users', (req, res) => {
    res.json(users)
})

app.listen(8080, () => {
    console.log("escuchando")
})

/*
$2b$10$qMSUtmmIEy5iucMM83BX4.hKoVslaQPykA/5cTzaVuh7WgRuUy7K.
$2b$10$untOBBfLfhD7daA7YRfiZe0yWeEQZNpKNvioyAg.wDzdCf6mSxkF.
*/