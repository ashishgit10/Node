import { Router } from 'express'
import User from '../models/userModel.js'

const route = Router()

route.get('/signup', (req, res) => {
    return res.render('signUp')
})

route.get('/signin', (req, res) => {
    return res.render('signIn')
})

route.post('/signup', async (req, res) => {
    const { email, password, fullname } = req.body
    try {
        const user = await User.create({
            email: email,
            password: password,
            fullName: fullname
        })
        return res.redirect('/user/signin')
    } catch (err) {
        res.status(400).json({ status: "User register Unsuccessfull" })
        console.log("err", err)
    }
})

route.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPwdGenToken(email, password);
        if (!token) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        /*  console.log(token) */
        res.cookie("token", token)
        return res.redirect("/");
    } catch (error) {
        console.error("Invalid email or password", error);
        return res.status(500).redirect("/user/signIn");
    }
})

export default route