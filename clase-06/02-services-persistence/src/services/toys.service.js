import toys from "../models/toys.model.js";

export default class ToysService {
    constructor() {
        this.toys = toys
    }

    async getAll() {
        return this.toys
    }

    async add(newToy) {
        this.toys.push(newToy)
        return newToy
    }
}