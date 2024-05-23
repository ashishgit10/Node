import { getUser } from "../Utils/cookieAuth.js"


const checkForAuthentication = (req, res, next) => {
    const tokenCookie = req.cookies?.token
    req.user = null
    /*     if (!authorizationHeaderValue || !authorizationHeaderValue.startWith('Bearer'))
            next()
        const token = authorizationHeaderValue.split("Bearer")[1]; */
    if (!tokenCookie) return next()
    const token = tokenCookie
    const user = getUser(token)
    req.user = user
    return next()
}

const restrictLogin = (role = []) => {
    return function (req, res, next) {
        console.log(req.user)
        if (!req.user) return res.redirect("/login")
        if (!role.includes(req.user.role)) return res.end("UnAuthorized")
        next()
    }
}


/* const resitrictUsertoLoggedin = async (req, res, next) => {
    const userUid = await req.headers["authorization"]
     console.log("userUid", userUid) 
    if (!userUid) return res.redirect('login')
    const user = getUser(userUid)
    if (!user) return res.redirect('login')
    console.log(req.user)
    req.user = user
    next()
} 

 const checkAuth = async (req, res, next) => {
    const userUid = await req.cookies?.uid
    const user = getUser(userUid)
    req.user = user
    next()
} */

export { checkForAuthentication, restrictLogin }