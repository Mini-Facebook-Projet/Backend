const mongoose = require('mongoose')

const dburl = 'mongodb+srv://abdessamadOLM:root@cluster0.lepfubn.mongodb.net/mini_facebook?retryWrites=true&w=majority'

//connection with the data base

module.exports = ()=>{
    return mongoose.connect(dburl)
}

