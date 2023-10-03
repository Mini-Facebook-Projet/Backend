const mongoose = require('mongoose')

module.exports = mongoose.model('Comment',{
    content : {type : String},
    dateCreation : {
        type : Date,
        default: Date.now()
    },
    authorId:{
        type: mongoose.Schema.Types.ObjectId,
    },
    authorName:{
        type: String,
    },
    post :{
        type: mongoose.Schema.Types.ObjectId
    }
})