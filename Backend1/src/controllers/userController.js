import asynchandler from "../utils/AsyncHandler.js"
import ApiError from "../utils/ApiError.js"
import { User } from "../models/userModel.js"
import { uploadCloudinary } from "../utils/Cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const registerUser = asynchandler(async (req, res) => {

    const { fullname, email, password, username } = req.body
    console.log("email", email)

    if (
        [fullname, email, password, username].some((fields) =>
            fields?.trim() == "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    console.log(existedUser)
    if (existedUser) {
        throw new ApiError(409, "username or password already existed")
    }
    const avatarlocalpath = req.files?.avatar[0]?.path;
    const coverImglocalpath = req.files?.coverImg[0]?.path;

    if (!avatarlocalpath) {
        throw new ApiError(400, "Avatar is required")
    }
    const avatar = await uploadCloudinary(avatarlocalpath)
    const coverImg = await uploadCloudinary(coverImglocalpath)
    if (!avatarlocalpath) {
        throw new ApiError(400, "Avatar is required")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImg: coverImg?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshtoken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Register unsuccessful while creating user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )
})


export default registerUser