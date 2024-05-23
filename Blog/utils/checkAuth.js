import jwt from "jsonwebtoken";
const Secret = "a$shish10@1"


const genrateToken = (user) => {
    const payload = {
        id: user._id,
        name: user.fullName,
        email: user.email,
        role: user.role
    }
    return jwt.sign(payload, Secret)
}


const verifyToken = (token) => {

    return jwt.verify(token, Secret)
}


export { genrateToken, verifyToken }