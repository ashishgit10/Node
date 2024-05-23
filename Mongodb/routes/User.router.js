import { Router } from "express"
import { find, register, update, removeUser } from "../controller/user.controller.js"
import logfile from "../middleware/log.middleware.js"

const router = Router()


router.use(logfile("log.txt"))

router.post("/register", register)
    .get("/find/:id", find)
    .patch("/update/:id", update)
    .delete("/delete/:id", removeUser)

export default router