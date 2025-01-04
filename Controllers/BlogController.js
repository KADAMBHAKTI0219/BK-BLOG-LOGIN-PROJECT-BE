const BlogPostModel = require("../Models/BlogPostsModel")

const BlogPostsCreate = async(req,res)=>{
    const {title,content,author,tags}=req.body
    try {
        const publishedDate = new Date()
        await BlogPostModel.create({title,content,publishedDate,tags,author,userId:req.user._id})
        res.status(201).json({message:"Blog post created successfully"})
    } catch (error) {
        return res.status(201).send({error:error})
    }

}

const BlogPostDelete = async(req,res)=>{
    const {postId} = req.params
    const isExistPost= await BlogPostModel.findById(postId)
    if(!isExistPost){
      return res.status(404).send({error:"note not found"})
    }
    if(isExistPost.userId!=req.user._id){
      return res.status(403).json({error:"you dont have permission to delete this note"})
    }
   try {
    await BlogPostModel.findByIdAndDelete(postId)
    res.status(200).json({message:"Blog Post Deleted Successfully "})
   } catch (error) {
    return res.status(201).send({error:"Internal Server Error"})
   }
}

const GetALLBlogPostByUser = async(req,res)=>{
    const{userId}=req.params
    try{
        if(userId!=req.user._id){
            return res.status(403).json({error:"you dont have permission to get note"})
      
          }
      
          const getAllPosts= await BlogPostModel.find({userId:userId})
       
        if(getAllPosts.length == 0){
            return res.status(404).json({message:"No Blog Posts Found "})
        }
        res.status(200).json({getAllPosts})
    }
    catch(error){
        return res.status(201).send({error:"Internal Server Error"})
    }
}

const GetSingleBlogPostByUser = async(req,res)=>{
    const {postId}=req.params
    try {
       
        const getSingleBlogPost = await BlogPostModel.findById(postId)
        if(!getSingleBlogPost){
            return res.status(404).send({error:"note not found"})
          }
          if(getSingleBlogPost.userId!=req.user._id){
            return res.status(403).json({error:"you dont have permission to delete this note"})
          }
        console.log(getSingleBlogPost)
        res.status(200).json({getSingleBlogPost})
    } catch (error) {
        return res.status(201).send({error:"Internal Server Error"})
    }
}

const UpdateBlogPostByUser = async(req,res)=>{
    const {postId} = req.params
    const {title,content,author,tags} = req.body
    try {
        const findUserId = await BlogPostModel.findById(postId)
        if(!findUserId){
            return res.status(404).send({error:"note not found"})
          }
          if(findUserId.userId!=req.user._id){
            return res.status(403).json({error:"you dont have permission to delete this note"})
          }
        const publishedDate = new Date()
        const updateBlogPost = await BlogPostModel.findByIdAndUpdate(postId,{title,content,author,tags,publishedDate})
            res.status(200).json({updateBlogPost})
            } catch (error) {
                return res.status(201).send({error:"Internal Server Error"})
                }
}


const GetAllBlogPostsByAdmin = async(req,res)=>{
    try {
        const getAllPosts = await BlogPostModel.find()
        if(!getAllPosts.length>0){
            return res.status(404).send({error:"No posts found"})
        }
        res.status(200).json({getAllPosts})
    } catch (error) {
        return res.status(201).send({error:"Internal Server Error"})
    }
}

const DeleteAllBlogPostsByAdmin = async(req,res)=>{
    await BlogPostModel.deleteMany({})
    res.status(200).json({ message: "All Notes have been Deleted." })
}


module.exports = {BlogPostsCreate,BlogPostDelete,GetALLBlogPostByUser,GetSingleBlogPostByUser,UpdateBlogPostByUser,GetAllBlogPostsByAdmin,DeleteAllBlogPostsByAdmin}