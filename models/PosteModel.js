const mongoose = require('mongoose')

module.exports = mongoose.model('Poste',{
    content : {type : String},
    imageUrl : {type : String},
    likeNumber : {type : Number},
    dislikeNumber : {type : Number},
    commentNumber : {type : Number},
    author:{type : Number},

})