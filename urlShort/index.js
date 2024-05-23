import router from "./routes/url.routes.js";
import connectDb from "./db/connection.js";
import express from "express"
import path from "path"
import staticRouter from "./routes/staticRouter.js"
import userSignup from "./routes/user.route.js"
import cookieParser from "cookie-parser";
import { checkForAuthentication, restrictLogin } from "./middleware/cookieAuth.js";

const app = express()

connectDb().then(() => {
    app.listen(8000, () => {
        console.log("Server listening at port 8000")
    })
}
).catch((err) => {
    console.log("error connecting Db", err)
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))


app.use(checkForAuthentication)

app.use("/", staticRouter)
app.use("/user", userSignup)
app.use("/url", restrictLogin("NORMAL"), router)

app.use("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId
    try {
        const entry = await Url.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitedHistory: {
                        timestamp: Date.now()
                    }
                }
            })
        if (!entry) {
            return res.status(404).json({ err: "Short URL not found" });
        }
        console.log(entry.redirectUrl)
        res.redirect(entry.redirectUrl)
    } catch (err) {
        console.error("Error redirecting URL:\n", err);
        res.status(500).json({ err: "internal err" })
    }


})