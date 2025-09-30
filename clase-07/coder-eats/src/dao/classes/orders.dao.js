import ordersModel from '../models/orders.model.js'

export default class Order {
    getAll = async () => {
        try {
            const orders = await ordersModel.find().populate('business').populate('user');
            return orders
        } catch (error) {
            console.log(error)
            return null
        }
    }

    getById = async (id) => {
        try {
            const order = await ordersModel.findById(id).populate('business').populate('user')
            return order
        } catch (error) {
            console.log(error)
            return null
        }
    }

    create = async (orderData) => {
        try {
            const newOrder = await ordersModel.create(orderData)
            return newOrder
        } catch (error) {
            console.log(error)
            return null
        }
    }

    update = async (id, orderData) => {
        try {
            const updatedOrder = await ordersModel.updateOne({_id: id}, orderData)
            return updatedOrder
        } catch (error) {
            console.log(error)
            return null
        }
    }
}