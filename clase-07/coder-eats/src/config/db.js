import mongoose from "mongoose";

export default class MongoConn {
    static instance

    constructor() {
        this.connection = null
    }

    async connect(url) {
        if (!MongoConn.instance) {
            this.connection = await mongoose.connect(url, {})
            MongoConn.instance = this
            console.log('MongoDB connected!')
        }

        return MongoConn.instance
    }
}