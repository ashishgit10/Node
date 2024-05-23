import jwt from "jsonwebtoken"

const secret = "ashish@123"
const setUser = (user) => {
    return jwt.sign({
        id: user._id,
        name: user.name,
        role: user.role
    }, secret)

}

const getUser = (token) => {
    if (!token) return null
    return jwt.verify(token, secret)
}


export { setUser, getUser }