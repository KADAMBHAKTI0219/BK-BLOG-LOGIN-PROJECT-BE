const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const connectionToDB = require('./Config/db')
const UserRouter = require('./Routes/UserRoutes')
const BlogPostsRouters = require('./Routes/BlogRoutes')

dotenv.config()
const app = express()
app.use(cookieParser());
app.use(express.json())
app.use(cors({
   origin: ["http://localhost:5173","http://localhost:5174","http://localhost:5175"],
   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
   credentials: true
}))

app.use('/api/blogUser',UserRouter)
app.use('/blogPosts',BlogPostsRouters)

app.listen(process.env.PORT || 3000,async()=>{
    try {
     await connectionToDB
     console.log(`Server is running on port ${process.env.PORT || 3000}`)
    } catch (error) {
     console.log(error)
    }
 })