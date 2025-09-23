import express from 'express';
import cors from 'cors'

const app = express();

app.use(cors())

app.use(express.json());
app.get('/test', (req, res) => {
    res.json({ message: 'Respuesta!' });
});

app.listen(8080, () => {
    console.log('Servidor escuchando en http://localhost:8080');
});