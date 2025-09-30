import { Router } from "express";
import UsersController from '../controllers/users.controller.js'

const router = Router()

router.get('/', UsersController.getAllUsers)
router.get('/:id', UsersController.getUser)
router.post('/', UsersController.createUser)

export default router