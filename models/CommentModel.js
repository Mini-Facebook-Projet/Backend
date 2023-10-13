const mongoose = require('mongoose')

module.exports = mongoose.model('Comment',{
    content : {type : String},
    dateCreation : {
        type : Date,
        default: Date.now()
    },
    author:{
        id:{type:mongoose.Schema.Types.ObjectId},
        name:{type:String}
    },
    post :{
        type: mongoose.Schema.Types.ObjectId
    }
})