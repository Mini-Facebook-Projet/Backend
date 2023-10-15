const express = require('express')

//to check object id
const objectId = require('mongoose').Types.ObjectId

const router = express.Router()

const comment = require('../models/CommentModel')

// get All comments
router.get('/',(req,res)=>{
    comment.find()
    .then(data => res.status(201).json(data))
    .catch(err => console.log(err))
})

// get all comment by post
// router.get('/postId/:id',(req,res)=>{
//     if(objectId.isValid(req.params.id) == false){
//         res.status(400).json({
//             error: " id is not valid"
//         })
//     }else{
//         comment.find()
//         .then(data =>{
//             tab = []
//             if(data.length > 0){
//                 for(let i=0 ; i<data.length ; i++){
//                     if(data[i].poste == req.params.id){
//                         tab = [...tab, data[i]]
//                     }
//                 }
                
//                 res.send(tab)
//             }else{
//                 res.status(404).json({
//                     error: " id not found or this post don't have any comment"
//                 })
//             }
//         })
//         .catch(err => console.log(err))
//     }
    

// })

// Create comments
router.post('/create', (req,res)=>{
    comment.create(req.body)
        .then(data => res.send(data))
        .catch(err => console.log(err))
})

// // update comment by id
// router.put('/comment/:id',(req,res)=>{
//     if(objectId.isValid(req.params.id) == false){
//         res.status(400).json({
//             error: " id is not valid"
//         })
//     }else{
//         comment.findByIdAndUpdate(req.params.id, req.body,{new:true})
//             .then(data => {
//                 if(data){
//                     res.send(data)
//                 }else{
//                     res.status(404).json({
//                         error: " id not found"
//                     })
//                 }
//             })
//             .catch(err => console.log(err))
//     }
// })

// // delete comment by id
// router.delete('/comment/:id',(req,res)=>{
//     if(objectId.isValid(req.params.id) == false){
//         res.status(400).json({
//             error: " id is not valid"
//         })
//     }else{
//         comment.findByIdAndDelete(req.params.id)
//             .then(data => {
//                 if(data){
//                     res.send(data)
//                 }else{
//                     res.status(404).json({
//                         error: " id not found"
//                     })
//                 }
//             })
//             .catch(err => console.log(err))
//     }
// })


module.exports = router