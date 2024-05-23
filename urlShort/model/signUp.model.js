import mongoose from 'mongoose'


const signUpSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        default: "NORMAL"
    },
    password: {
        type: String,
        required: true,
    }
})

const signUp = mongoose.model("signUp", signUpSchema)
export default signUp
