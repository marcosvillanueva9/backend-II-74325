import Business from "../dao/classes/business.dao.js"
// import product

const dbService = new Business()

export default class BusinessController {
    
    static async getAllBusiness(req, res) {
        try {
            const businesses = await dbService.getAll()
            if (!businesses) res.status(500).json({status: 'error', message: 'Failed to retrieve'})
            else if (businesses.length === 0) res.status(404).json({status: 'error', message: 'No businesses found'})
            else res.json({status: 'success', result: businesses})
        } catch (error) {
            res.status(500).json({status: 'error', message: 'Unexpected error'})
        }
    }

    static async getBusiness(req, res) {
        try {
            const { id } = req.params
            // validaciones del id que sea correcto
            const business = await dbService.getById(id)
            if (!business) res.status(404).json({status: 'error', message: 'Business Not found'})
            else res.json({status: 'success', result: business})
        } catch (error) {
            res.status(500).json({status: 'error', message: 'Unexpected error'})
        }
    }

    static async createBusiness(req, res) {
        try {
            const businessData = req.body
            // validaciones del modelo que sea correcto
            const newBusiness = await dbService.create(businessData)
            if (!newBusiness) res.status(500).json({status: 'error', message: 'Failed to create'})
            else res.json({status: 'success', result: newBusiness})
        } catch (error) {
            res.status(500).json({status: 'error', message: 'Unexpected error'})
        }
    }

    static async addProduct(req, res) {
        try {
            const { id } = req.params
            const productData = req.body
            // validaciones del modelo y id que sea correcto
            let business = await dbService.getById(id)
            if (!business) {
                res.status(404).json({status: 'error', message: 'Business Not found'})
                return
            }


            // primero crear producto


            business.products.push(productData)

            const updatedBusiness = await dbService.update(id, business)
            if (!updatedBusiness) {
                res.status(500).json({status: 'error', message: 'Failed adding a product'})
                return
            }

            res.json({status: 'success', result: updatedBusiness})
        } catch (error) {
            res.status(500).json({status: 'error', message: 'Unexpected error'})
        }
    }
}