import users from "../models/users.model.js";

export default class UsersService {
    constructor() {
        this.users = users
    }

    async getAll() {
        return this.users
    }

    async add(newUser) {
        this.users.push(newUser)
        return newUser
    }
}