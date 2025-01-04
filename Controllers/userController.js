const UserBlogModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const SignUp = async(req,res)=>{
    const {name,email,password,role} = req.body;
    if (role) {
        return res
          .status(400)
          .send({ message: "Role should not be provided at signup" });
      }
    
      if (!name || !email || !password) {
        return res.status(400).send({ message: "Please fill in all fields" });
      }
    
   try {
    const user = await UserBlogModel.findOne({email});
    if(user){
        return res.status(400).json({message:"Email already exists"});
        }
        const hashPassword = await bcrypt.hash(password,10)
        await UserBlogModel.create({name,email,password:hashPassword});
        return res.status(201).json({message:"User created successfully"});
   } catch (error) {
    return res.status(400).json({error})
   }
}

const SignIn = async(req,res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: "Please fill in all fields" });
      }
      const isExistUser = await UserBlogModel.findOne({ email });
      if (!isExistUser) {
        return res.status(400).send({ message: "Email does not exist" });
      }
      bcrypt.compare(password, isExistUser.password, function (err, result) {
        if (err) {
          return res.status(500).send({ message: "Internal server error" });
        }
        if (result) {
          const { password, ...rest } = isExistUser._doc;
          jwt.sign({ userData: rest }, process.env.jwt_password, function (err, token) {
            if (err) {
              return res.status(400).send({ message: "err compare token" });
            }
            res
              .cookie("AccessToken", token)
              .status(200)
              .json({ message: "user login", userData: rest });
          });
        } else {
          return res.status(400).send({ message: "Invalid password" });
        }
      });
}

module.exports = {SignUp,SignIn}