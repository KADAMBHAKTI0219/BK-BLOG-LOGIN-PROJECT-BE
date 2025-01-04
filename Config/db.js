const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const connectionToDB = mongoose.connect(process.env.MongoDB_URL)
module.exports = connectionToDB