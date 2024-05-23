import mongoose from "mongoose"

const connectDb = async () => {
    try {
        const connect = await mongoose.connect("mongodb://127.0.0.1:27017/mern")
            .then(() => console.log("mongodb connected!"))
    } catch (err) {
        console.log("err", err)
    }


}


export default connectDb