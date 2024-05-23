import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const videoSchema = new Schema(
    {
        videofile: {
            type: String,
            require: true
        },
        thumbnail: {
            type: String,
            require: true
        },
        description: {
            type: Number,
            require: true
        }
        ,
        views: {
            type: Number,
            default: 0
        }
        ,
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },

    {
        timestamps: true
    }
)
videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema)