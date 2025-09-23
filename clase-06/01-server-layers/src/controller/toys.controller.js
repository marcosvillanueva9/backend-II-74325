export default class ToysController {
    constructor () {
        this.toys = [];
    }

    async getAllToys(req, res) {
        try {
            res.status(200).json(this.toys)
            return
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve toys', message: error})
        }
    }

    async addToy(req, res) {
        try {
            const newToy = req.body
            this.toys.push(newToy)
            res.status(201).json(newToy)
        } catch (error) {
            res.status(500).json({ error: 'Failed to create a new toy'})
        }
    }
}