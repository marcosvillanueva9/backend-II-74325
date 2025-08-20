import express from 'express'
import session from 'express-session'
import sessionFileStore from 'session-file-store'

const app = express()

const FileStore = sessionFileStore(session)

app.use(session({
    store: new FileStore({
        path: './sessions',
        ttl: '3600'
    }),
    secret: 'coderhouse',
    resave: true,
    saveUninitialized: true,
}));

app.get('/', (req, res) => {
    if (!req.session.contador) {
        req.session.contador = 1
        req.session.nombre = req.query.nombre || 'Anakin'
        res.send('Hello there, ' + req.session.nombre)
    } else {
        req.session.contador++
        res.send('Hello again ' + req.session.nombre + ' , esta es la vez numero ' + req.session.contador)
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('error al cerrar sesion')
        }

        res.send('sesion cerrada correctamente')
    })
})

const PORT = 8080

app.listen(PORT, () => {
    console.log("escuchando")
})