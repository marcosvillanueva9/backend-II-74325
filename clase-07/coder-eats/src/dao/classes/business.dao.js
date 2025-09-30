import businessModel from '../models/business.model.js'

export default class Business {
    getAll = async () => {
        try {
            const businesses = await businessModel.find();
            return businesses
        } catch (error) {
            console.log(error)
            return null
        }
    }

    getById = async (id) => {
        try {
            const business = await businessModel.findById(id)
            return business
        } catch (error) {
            console.log(error)
            return null
        }
    }

    create = async (businessData) => {
        try {
            const newBusiness = await businessModel.create(businessData)
            return newBusiness
        } catch (error) {
            console.log(error)
            return null
        }
    }

    update = async (id, businessData) => {
        try {
            const updatedBusiness = await businessModel.updateOne({_id: id}, businessData)
            return updatedBusiness
        } catch (error) {
            console.log(error)
            return null
        }
    }
}