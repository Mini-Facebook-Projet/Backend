const mongoose = require('mongoose')

module.exports = mongoose.model('Poste',{
    content : {type : String},
    dateCreation : {
        type : Date,
        default: Date.now()
    },
    imageUrl : {type : String},
    likeNumber : {type : Number},
    dislikeNumber : {type : Number},
    commentNumber : {type : Number},
    author:{
        type : mongoose.Schema.Types.ObjectId
    },

})