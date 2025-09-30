import UserDAO from "../dao/classes/users.dao.js"

const userDb = new UserDAO()

export default class UsersController {
    
    static async getAllUsers(req, res) {
        try {
            const users = await userDb.getAll()
            if (!users) res.status(500).json({status: 'error', message: 'Failed to retrieve'})
            else if (users.length === 0) res.status(404).json({status: 'error', message: 'No users found'})
            else res.json({status: 'success', result: users})
        } catch (error) {
            res.status(500).json({status: 'error', message: 'Unexpected error'})
        }
    }

    static async getUser(req, res) {
        try {
            const { id } = req.params
            // validaciones del id que sea correcto
            const user = await userDb.getById(id)
            if (!user) res.status(404).json({status: 'error', message: 'User Not found'})
            else res.json({status: 'success', result: user})
        } catch (error) {
            res.status(500).json({status: 'error', message: 'Unexpected error'})
        }
    }

    static async createUser(req, res) {
        try {
            const userData = req.body
            // validaciones del modelo que sea correcto
            const newUser = await userDb.create(userData)
            if (!newUser) res.status(500).json({status: 'error', message: 'Failed to create'})
            else res.json({status: 'success', result: newUser})
        } catch (error) {
            res.status(500).json({status: 'error', message: 'Unexpected error'})
        }
    }
}