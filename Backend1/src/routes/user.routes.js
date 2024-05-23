import { Router } from "express"
import registerUser from "../controllers/userController.js"
import {upload} from "../middlewares/multer.js"
const router = Router()

router.route("/register").post(
    upload.fields(
        [
            {
                name: "avatar",
                maxCount: 1
            },
            {
                name: "coverImg",
                maxCount: 1
            }
        ]),
    registerUser)


export default router