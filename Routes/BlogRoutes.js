const express = require('express')
const { BlogPostsCreate, BlogPostDelete, GetALLBlogPostByUser, GetSingleBlogPostByUser, UpdateBlogPostByUser, GetAllBlogPostsByAdmin, DeleteAllBlogPostsByAdmin } = require('../Controllers/BlogController')
const isAuth = require('../MiddleWare/Auth')
const isAdmin = require('../MiddleWare/Admin')

const BlogPostsRouters = express.Router()
BlogPostsRouters.post("/createBlogPost",isAuth,BlogPostsCreate)
BlogPostsRouters.delete('/deleteBlogPost/:postId',isAuth,BlogPostDelete)
BlogPostsRouters.get("/getAllPosts/:userId",isAuth,GetALLBlogPostByUser)
BlogPostsRouters.get("/getSinglePost/:postId",isAuth,GetSingleBlogPostByUser)
BlogPostsRouters.put("/updateBlogPost/:postId",isAuth,UpdateBlogPostByUser)
BlogPostsRouters.get('/getAllPosts',isAuth,isAdmin,GetAllBlogPostsByAdmin)
BlogPostsRouters.delete('/deleteAllPosts',isAuth,isAdmin,DeleteAllBlogPostsByAdmin)
module.exports = BlogPostsRouters