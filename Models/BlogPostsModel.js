const mongoose = require('mongoose')
const BlogSchema = new mongoose.Schema({
    title:String,
    author:String,
    content:String,
    tags:[String],
    publishedDate:String,
    userId:String
},{
    timestamps:true,
    versionKey:false
})

const BlogPostModel = mongoose.model('blogPosts',BlogSchema)
module.exports = BlogPostModel