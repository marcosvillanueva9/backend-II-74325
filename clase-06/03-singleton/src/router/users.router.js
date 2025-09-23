import { Router } from "express";
import UsersController from '../controller/users.controller.js'

const router = Router()
const userController = new UsersController()

router.get('/', (req, res) => userController.getAllUsers(req, res))
router.post('/', (req, res) => userController.addUser(req, res))

export default router