import express from "express"
import connectDb from "./db/connection.js"
import router from "./routes/User.router.js"

const app = express()

app.use(express.urlencoded({ extended: false }))

connectDb().then(() => {
    app.listen(8000, () => {
        console.log("server listening at port 8000")
    })
}).catch((err) => {
    console.log("err", err)
})



app.use("/user", router)
