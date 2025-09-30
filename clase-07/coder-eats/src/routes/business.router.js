import { Router } from "express";
import BusinessController from '../controllers/business.controller.js'

const router = Router()

router.get('/', BusinessController.getAllBusiness)
router.get('/:id', BusinessController.getBusiness)
router.post('/', BusinessController.createBusiness)
router.post('/:id/products', BusinessController.addProduct)

export default router