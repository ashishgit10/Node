import mongoose, { Schema } from "mongoose"

const userBlog = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

}, { timestamps: true })


const Blog = mongoose.model("Blog", userBlog)

export default Blog