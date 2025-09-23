import mongoose from "mongoose";

class MongoSingleton {
    static instance

    constructor() {
        this.connection = null
    }

    async connect (url) {
        if (!MongoSingleton.instance) {
            this.connection = await mongoose.connect(url, {})
            console.log('nos conectamos!')
            MongoSingleton.instance = this
        }
        return MongoSingleton.instance
    }
}

export default MongoSingleton