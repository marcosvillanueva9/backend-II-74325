import express from 'express'

import { User } from '../models/usuarios.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const usuarios = await User.find()
        res.status(200).send(usuarios)
    } catch (error) {
        res.status(500).send("fallo el acceso a la db")
    }
})

router.get('/:id', async (req, res) => {
    try {
        const IDENTIFICADOR = req.params.id
        const usuario = await User.find({ _id: IDENTIFICADOR})
        User.findById(IDENTIFICADOR)
        if (!usuario) return res.status(404).send("usuario no encontrado")
        res.status(200).send(usuario)
    } catch (error) {
        res.status(500).send("fallo el acceso a la db")
    }
})

router.post('/', async (req, res) => {
    const { name, email, age } = req.body

    if (!name || !email || !age) {
        return res.status(400).send({ error: "te faltan datos" })
    }

    try {
        const nuevoUsuario = new User({name, email, age})
        await nuevoUsuario.save()
        res.status(201).send({ mensaje: "creado correctamente", usuario: nuevoUsuario})
    } catch (error) {
        res.status(500).send({message:"fallo el acceso a la db", error: error})
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const newData = req.body

    console.log(id)
    console.log(newData)

    try {
        const userUpdated = await User.findByIdAndUpdate(id, newData)
        if (!userUpdated) return res.status(404).send("usuario no encontrado")
        res.send({ message: "actualizado", obj: userUpdated}) 
    } catch (error) {
        res.status(500).send({message:"fallo el acceso a la db", error: error})
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    
    const userDeleted = await User.findByIdAndDelete(id)
    if (!userDeleted) return res.status(404).send("usuario no encontrado")
    res.send({ message: "eliminado", obj: userDeleted}) 
})

export default router