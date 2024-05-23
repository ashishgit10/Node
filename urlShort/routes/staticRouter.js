import { Router } from "express"
import Url from "../model/url.model.js"
import { restrictLogin } from "../middleware/cookieAuth.js"

const router = Router()

router.get("/",restrictLogin("NORMAL"), async (req, res) => {
   if (!req.user) return res.redirect('/login')
   const allurls = await Url.find({ createdBy: req.user._id })
   return res.render("home", {
      urls: allurls,
      name:req.user.name
   })
})
router.get("/signUp", async (req, res) => {
   return res.render("signUp")
})
router.get("/login", async (req, res) => {
   return res.render("login")
})
export default router