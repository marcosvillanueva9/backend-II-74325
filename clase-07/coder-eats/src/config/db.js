import mongoose from "mongoose";

class MongoConn {
    static instance

    constructor() {
        this.connection = null
    }

    async connect (url) {
        if (!MongoConn.instance) {
            this.connection = await mongoose.connect(url, {})
            console.log('MongoDB connected!')
            MongoConn.instance = this
        }
        return MongoConn.instance
    }
}

export default MongoConn