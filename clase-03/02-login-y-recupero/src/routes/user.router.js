import { Router } from 'express';
import bcrypt from 'bcrypt';

import userModel from '../models/user.model.js'

const userRouter = Router()

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

userRouter.post('/login', async (req, res) => {
    const { username, password } = req.body

    const user = await userModel.findOne({username})
    if (!user || !isValidPassword(user, password)) {
        return res.status(401).json({error: 'usuario o contrasena invalida'})
    }

    res.status(200).json({message: 'logueado correctamente', user})
})

userRouter.post('/register', async (req, res) => {
     const { username, password } = req.body

     const user = await userModel.findOne({username})
     if (user) {
        return res.status(401).json({ error: 'ya existe un usuario con ese username'})
     }

     const hashedPassword = createHash(password)
     await userModel.create({username, password: hashedPassword})
     res.status(201).json({message: 'creado correctamente'})
})

userRouter.post('/forgot-password', async (req, res) => {
    const { username, newPassword } = req.body

    const user = await userModel.findOne({username})
    if (!user) {
        return res.status(401).json({ error: 'no existe ese username'})
    }

    const hashedPassword = createHash(newPassword)
    user.password = hashedPassword
    await user.save()
    res.status(201).json({message: 'actualizado correctamente'})
})

export default userRouter;