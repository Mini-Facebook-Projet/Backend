const express = require('express')

//to check object id
const objectId = require('mongoose').Types.ObjectId
// roote to handle rootes and http request
const router = express.Router()

//get the model to find data
const Poste = require('../models/PosteModel')

// get All postes
router.get('/list',(req,res)=>{
    console.log('request body :',req.body)
    Poste.find()
    .then(data => res.status(201).json(data))
    .catch(err => console.log(err))
})


// get poste by id
router.get('/id/:id',(req,res)=>{
    if(objectId.isValid(req.params.id) == false){
        res.status(400).json({
            error: " id is not valid"
        })
    }else{
        Poste.findById(req.params.id)
            .then(data => {
                if(data){
                    res.send(data)
                }else{
                    res.status(404).json({
                        error: " id not found"
                    })
                }
            })
            .catch(err => console.log(err))
    }
})

// create a poste
router.post('/',(req,res)=>{
    Poste.create(req.body)
    .then(data => res.send(data))
    .catch(err => console.log(err))
})

// update poste by id
router.put('/:id',(req,res)=>{
    if(objectId.isValid(req.params.id) == false){
        res.status(400).json({
            error: " id is not valid"
        })
    }else{
        Poste.findByIdAndUpdate(req.params.id, req.body,{new:true})
            .then(data => {
                if(data){
                    res.send(data)
                }else{
                    res.status(404).json({
                        error: " id not found"
                    })
                }
            })
            .catch(err => console.log(err))
    }
})

// delete poste by id
router.delete('/:id',(req,res)=>{
    if(objectId.isValid(req.params.id) == false){
        res.status(400).json({
            error: " id is not valid"
        })
    }else{
        Poste.findByIdAndDelete(req.params.id)
            .then(data => {
                if(data){
                    res.send(data)
                }else{
                    res.status(404).json({
                        error: " id not found"
                    })
                }
            })
            .catch(err => console.log(err))
    }
})


module.exports = router
