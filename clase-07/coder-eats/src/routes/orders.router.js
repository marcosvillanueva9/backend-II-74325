import { Router } from "express";
import OrdersController from '../controllers/orders.controller.js'

const router = Router()

router.get('/', OrdersController.getAllOrders)
router.get('/:id', OrdersController.getOrder)
router.post('/', OrdersController.createOrder)
router.put('/:id', OrdersController.resolveOrder)

export default router