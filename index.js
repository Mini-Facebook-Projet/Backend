const express = require('express')
const bodyParser = require('body-parser')
//local 
//import db promise
const connectDb = require('./db.js')
// import controllers routers
const posteRoutes = require('./controllers/PosteController.js')
const commentRoutes = require('./controllers/CommentController.js')
const app = express()
//Midleware to parse requeste body to json
app.use(bodyParser.json())
app.use('/api/postes',posteRoutes)
app.use('/api/comments',commentRoutes)


connectDb()
    .then(()=>{
        console.log('database connection succeeded')
        // start the server
        app.listen(8080,()=> console.log('server started on 8080'))
    })
    .catch(err=> console.log(err))

