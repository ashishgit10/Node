import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { genrateToken } from "../utils/checkAuth.js";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        uniquie: true
    },
    password: {
        type: String,
        required: true,
    },
    profileImg: {
        type: String,
        default: "/DefaultImg/profile.jpg"
    },
    salt: {
        type: String,

    },
    role: {
        type: String,
        required: true,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
})

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) return

    const salt = bcrypt.genSaltSync(10);
    const hashpwd = bcrypt.hashSync(user.password, salt);

    this.salt = salt;
    this.password = hashpwd
    next()
})

userSchema.static("matchPwdGenToken", async function (email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const hashedPassword = user.password;
    try {
        const match = bcrypt.compareSync(password, hashedPassword);
        if (match) {
            const token = genrateToken(user);
            return token;
        } else {
            throw new Error("Invalid email or password");
        }
    } catch (error) {
        throw new Error("Error comparing passwords", error);
    }
});
/* userSchema.static("matchPwd", async function (email, password) {
    const user = this.findOne({ email })
    if (!user) return false
    const pwd = user.password
    try {
        const match = bcrypt.compareSync(password, pwd)
        return match;
    } catch (error) {
        throw new Error("Error comparing passwords", error);
    }
}); */
const User = mongoose.model("User", userSchema)



export default User