import express from 'express'

import { usuario } from '../models/usuarios.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const usuarios = await usuario.find()
        res.status(200).send(usuarios)
    } catch (error) {
        res.status(500).send("fallo el acceso a la db")
    }
    
})

router.post('/', async (req, res) => {
    const { nombre, apellido, edad, dni } = req.body

    if (!nombre || !apellido || !dni) {
        return res.status(400).send({ error: "te faltan datos" })
    }

    try {
        const nuevoUsuario = new usuario({nombre, apellido, edad, dni})
        await nuevoUsuario.save()
        res.status(201).send({ mensaje: "creado correctamente", usuario: nuevoUsuario})
    } catch (error) {
        res.status(500).send({message:"fallo el acceso a la db", error: error})
    }
})

export default router