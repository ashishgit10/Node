import mongoose from "mongoose"

const connectDb = async () => {
    try {
        const db = await mongoose.connect("mongodb://127.0.0.1:27017/shorturl").then(() =>
            console.log("MongoDb connected Successfully"))
    } catch (err) {
        console.log("Error connect Db", err)
    }
}

export default connectDb