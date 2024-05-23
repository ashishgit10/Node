import express from "express"
import path from "path"
import route from "./routes/user.js"
import { route as blogRoute } from "./routes/blog.js"
import connectDb from "./db/connection.js"
import cookieParser from "cookie-parser"
import { checkForAuthentication } from "./middleware/Authentication.js"
import Blog from "./models/blog.js"

const app = express()


app.set('view engine', 'ejs')
app.set("views", path.resolve('./views'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.resolve("./public")))

connectDb().then(() => {
    app.listen(8001, () => {
        console.log("server is connected at port 8000")
    })

}).catch((err) => {
    console.log("err", err)
})


app.use(checkForAuthentication("token"))


app.get("/", async (req, res) => {
    const allBlog = await Blog.find({})
    res.render("home", {
        user: req.user,
        blogs: allBlog
    })
})
app.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/")
})
app.use("/blog", blogRoute)

app.use("/user", route)
