import express from "express"
import path from "path"
import multer from 'multer'


const app = express()

app.set('view engine', 'ejs')
app.set("views", path.resolve('./views'))
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    return res.render('home')
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     return cb(null,'./uploads')
    },
    filename: function (req, file, cb) {
  return cb(null,`${Date.now()}-${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })

app.post('/profile', upload.single("profileImg"), (req, res) => {
    console.log(req.body)
    console.log(req.file)

    return res.redirect("/")
})


app.listen(8000, () => {
    console.log("Server listening at port 8000")
})