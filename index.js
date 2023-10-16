const express = require('express')
const bodyParser = require('body-parser')
const cors = require ('cors')
//local 
//import db promise
const connectDb = require('./db.js')
// import controllers routers
const posteRoutes = require('./controllers/PosteController.js')
const commentRoutes = require('./controllers/CommentController.js')
const app = express()


const userRoutes = require('./routes/userRoutes');
//Midleware to parse requeste body to json
app.use(bodyParser.json())
app.use(cors())

app.use('/api/v1/', userRoutes);
app.use('/api/v1/postes',posteRoutes)
app.use('/api/v1/comments/',commentRoutes)


connectDb()
    .then(()=>{
        console.log('database connection succeeded')
        // start the server
        app.listen(8080,()=> console.log('server started on 8080'))
    })
    .catch(err=> console.log(err))

