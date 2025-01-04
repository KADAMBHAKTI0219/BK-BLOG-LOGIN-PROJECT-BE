const express=require('express')
const {  SignUp, SignIn } = require('../Controllers/userController')
const UserRouter = express.Router()
UserRouter.post('/SignUp',SignUp)
UserRouter.post('/SignIn',SignIn)
module.exports = UserRouter