const config = require('./config/config.js')
const mongoose = require('mongoose')

const dbUrl = config.DB_URL
module.exports=()=>{
    return mongoose.connect(dbUrl)
}