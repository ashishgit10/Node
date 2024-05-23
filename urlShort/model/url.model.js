import mongoose from "mongoose"

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitedHistory:
        [
            {
                timestamp: {
                    type: Number
                }
            }
        ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }

},
    { timestamp: true })

const Url = mongoose.model("Url", urlSchema)
export default Url