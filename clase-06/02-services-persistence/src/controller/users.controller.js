import UsersService from "../services/users.service.js";

export default class UsersController {
    constructor () {
        this.userService = new UsersService();
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.userService.getAll()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve users'})
        }
    }

    async addUser(req, res) {
        try {
            const newUser = req.body
            if (!newUser || !newUser.name || !newUser.email) {
                return res.status(400).json({error: 'Invalid data'})
            }
            const addedUser = await this.userService.add(newUser)
            res.status(201).json(addedUser)
        } catch (error) {
            res.status(500).json({ error: 'Failed to create a new user'})
        }
    }
}