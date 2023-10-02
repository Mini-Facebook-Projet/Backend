const express = require('express')
const bodyParser = require('body-parser')
//local 
//import db promise
const connectDb = require('./db.js')
const posteRoutes = require('./controllers/PosteController.js')
const app = express()
//Midleware to parse requeste body to json
app.use(bodyParser.json())
app.use('/api/postes',posteRoutes)


connectDb()
    .then(()=>{
        console.log('database connection succeeded')
        // start the server
        app.listen(8080,()=> console.log('server started on 8080'))
    })
    .catch(err=> console.log(err))

