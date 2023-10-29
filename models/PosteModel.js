const mongoose = require('mongoose')

module.exports = mongoose.model('Poste',{
    author:{
        id:{type : mongoose.Schema.Types.ObjectId},
        name : {type : String},
        image:{type:String, default : ''}
    },
    content : {type : String},
    dateCreation : {
        type : Date,
        default: Date.now()
    },
    image : {type : String},
    likes : [{type : mongoose.Schema.Types.ObjectId}],
    commentNumber : {type : Number,default:0},  

})