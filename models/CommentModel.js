const mongoose = require('mongoose')

module.exports = mongoose.model('Comment',{
    content : {type : String},
    dateCreation : {
        type : Date,
        default: Date.now()
    },
    author:{type : String},
    poste :{
        type: mongoose.Schema.Types.ObjectId
    }
})