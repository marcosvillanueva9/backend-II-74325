import usersModel from '../models/users.model.js'

export default class User {
    getAll = async () => {
        try {
            const users = await usersModel.find();
            return users
        } catch (error) {
            console.log(error)
            return null
        }
    }

    getById = async (id) => {
        try {
            const user = await usersModel.findById(id)
            return user
        } catch (error) {
            console.log(error)
            return null
        }
    }

    create = async (userData) => {
        try {
            const newUser = await usersModel.create(userData)
            return newUser
        } catch (error) {
            console.log(error)
            return null
        }
    }
}