const mongoose = require('mongoose')
const BlogUserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:'user'
    }
},{
    timestamps:true,
    versionKey:false
})

const UserBlogModel = mongoose.model('blogUsers',BlogUserSchema)
module.exports = UserBlogModel