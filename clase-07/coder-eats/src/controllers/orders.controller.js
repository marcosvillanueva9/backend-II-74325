import OrderDAO from "../dao/classes/orders.dao.js"
import UserDAO from "../dao/classes/users.dao.js"
import BusinessDAO from "../dao/classes/business.dao.js"

const orderService = new OrderDAO()
const userService = new UserDAO()
const businessService = new BusinessDAO()

export default class OrdersController {
    
    static async getAllOrders(req, res) {
        try {
            const orders = await orderService.getAll()
            if (!orders) res.status(500).json({status: 'error', message: 'Failed to retrieve'})
            else if (orders.length === 0) res.status(404).json({status: 'error', message: 'No orders found'})
            else res.json({status: 'success', result: orders})
        } catch (error) {
            res.status(500).json({status: 'error', message: 'Unexpected error'})
        }
    }

    static async getOrder(req, res) {
        try {
            const { id } = req.params
            // validaciones del id que sea correcto
            const order = await orderService.getById(id)
            if (!order) res.status(404).json({status: 'error', message: 'Order Not found'})
            else res.json({status: 'success', result: order})
        } catch (error) {
            res.status(500).json({status: 'error', message: 'Unexpected error'})
        }
    }

    static async createOrder(req, res) {
        try {
            const { userId, businessId, products } = req.body
            // validaciones del modelo que sea correcto

            const user = await userService.getById(userId)
            if (!user) {
                res.status(404).json({status: 'error', message: 'User Not found'})
                return
            }

            const business = await businessService.getById(businessId)
            if (!business) {
                res.status(404).json({status: 'error', message: 'Business Not found'})
                return
            }

            let actualOrder = business.products.filter( product => products.includes(product._id))
            let sum = actualOrder.reduce((acc, product) => acc + product.price, 0)
            let orderNumber = Date.now() + Math.floor(Math.random() * 1000)

            let order = {
                number: orderNumber,
                business: businessId,
                user: userId,
                status: 'pending',
                products: actualOrder.map(product => product.id),
                totalPrice: sum
            }

            let orderResult = await orderService.create(order)
            // actualizar el user

            res.json({status: 'success', result: orderResult})

        } catch (error) {
            res.status(500).json({status: 'error', message: 'Unexpected error'})
        }
    }

    static async resolveOrder(req, res) {
        const { id } = req.params
        const orderData = req.body

        const updatedOrder = await orderService.update(id, orderData)
        if (!updatedOrder) {
                res.status(500).json({status: 'error', message: 'Failed to resolve'})
                return
        }

        res.json({status: 'success', result: updatedOrder})
    }
}