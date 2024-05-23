import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import Blog from "../models/blog.js"
import Comment from "../models/comment.js"
const route = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`
        cb(null, filename)
    }
})

const upload = multer({ storage: storage })



route.get('/add-blog', (req, res) => {
    return res.render('addBlog', {
        user: req.user
    })
})

route.get('/:id', async (req, res) => {
    const blogs = await Blog.findById(req.params.id).populate("createdBy")
    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy")
    console.log(blogs)
    return res.render("blog", {
        user: req.user,
        blogs,
        comments
    })
})

route.post('/', upload.single("thumbnail"), async (req, res) => {
    const { title, body } = req.body
    try {
        const blog = await Blog.create({
            title: title,
            body: body,
            createdBy: req.user.id,
            thumbnail: `/uploads/${req.file.filename}`,
        })
        return res.redirect(`/blog/${blog.id}`)
    } catch (err) {
        console.log("err uploading File", err)
    }
})

route.post('/comment/:blogId', async (req, res) => {

    try {
        const blog = await Comment.create({
            content: req.body.content,
            blogId: req.params.blogId,
            createdBy: req.user.id,

        })
     
        return res.redirect(`/blog/${req.params.blogId}`)
    } catch (err) {
        console.log("err uploading File", err)
    }
})

export { route }