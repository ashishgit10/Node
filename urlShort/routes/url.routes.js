import { Router } from "express"
import { handleShortUrl, analytics } from "../controller/shorturlctrl.js"



const router = Router()


router.post("/",handleShortUrl)
router.get("/analytics/:shortId", analytics)

export default router