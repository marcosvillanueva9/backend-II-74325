import ToysService from "../services/toys.service.js";

export default class ToysController {
    constructor () {
        this.toyService = new ToysService();
    }

    async getAllToys(req, res) {
        try {
            const toys = await this.toyService.getAll()
            res.status(200).json(toys)
            return
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve toys', message: error})
        }
    }

    async addToy(req, res) {
        try {
            const newToy = req.body
            if (!newToy || !newToy.name || !newToy.price) {
                return res.status(400).json({error: 'Invalid data'})
            }
            const addedToy = await this.toyService.add(newToy)
            res.status(201).json(addedToy)
        } catch (error) {
            res.status(500).json({ error: 'Failed to create a new toy'})
        }
    }
}