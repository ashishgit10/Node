import signUp from "../model/signUp.model.js"
import { v4 as uuidv4 } from "uuid"
import { setUser } from "../Utils/cookieAuth.js"


const handleSignup = async (req, res) => {
    const { name, email, password } = req.body
    if (name == "" || email == "" || password == "") {
        res.status(400).json({ status: "All fields are required" })
    }
    try {
        await signUp.create({
            name: name,
            email: email,
            password: password
        })
        return res.render("login", { status: "user Successfully registered!" })
    } catch (err) {
        console.error("Error signup:\n", err);
        res.status(500).json({ err: "internal err signup" })
    }
}



const handleLogin = async (req, res) => {
    const { email, password } = req.body
    if (email == "" || password == "") {
        res.status(400).json({ status: "All fields are required" })
    }
    try {
        const entry = await signUp.findOne({
            email,
            password
        })
        if (!entry) {
            return res.redirect("/")
        }
        /*   const sessionId = uuidv4() */
        const token = setUser(entry)
        res.cookie("token", token)
        return res.redirect("/")
    } catch (err) {
        console.error("Error login:\n", err);
        res.status(500).json({ err: "user cannot login!" })
    }
}

export { handleSignup, handleLogin }