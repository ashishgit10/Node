import { Router } from "express"
import {handleLogin, handleSignup} from "../controller/handleSignup.js"

const router = Router()

router.post("/signUp", handleSignup)
router.post("/login", handleLogin)
export default router