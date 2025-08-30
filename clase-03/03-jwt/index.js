import express from 'express'

import { generateToken, authToken } from './utils.js'

const app = express()

const users = [
    { username: 'tato', rol: 'admin', dni: '12345'}
]

app.post('/login/:username', (req, res) => {
    const username = req.params.username


    const user = users.find(u => u.username === username)
    console.log(user)
    const token = generateToken(user)

    res.json({ token })
})

app.get('/protected', authToken, (req, res) => {
    res.json({ message: 'estas logueado!!!'})
})

app.listen(8080, () => {
    console.log("escucha")
})