import { verifyToken } from "../utils/checkAuth.js"

const checkForAuthentication = (cookieName) => {
    return (req, res, next) => {
        const tokenCookieVal = req.cookies[cookieName]
        if (!tokenCookieVal) {
            return next()
        }
    /*     console.log(req.cookies) */
        try {
            const userPayload = verifyToken(tokenCookieVal)
            req.user = userPayload
        } catch (err) {
            console.error("Error verifying token:", err)
            return res.status(401).send("Unauthorized")
        }
        return next() 
    }
}
export {checkForAuthentication}