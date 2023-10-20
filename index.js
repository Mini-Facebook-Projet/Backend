const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Local
// Import db promise
const connectDb = require('./db.js');

// Import controllers routers
// const posteRoutes = require('./controllers/PostController.js');
// const commentRoutes = require('./controllers/CommentController.js');
const app = express();


const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes.js')
const commentRoutes = require('./routes/commentRoutes.js')
const chatrouter = require('./routes/ChatRoutes.js')

// Middleware to parse request body to JSON
app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/postes', postRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/chatgpt',chatrouter);

const config = require('./config/config.js')
const port = config.PORT

// const openai = new OpenAI({
//     apiKey:"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"
// })

// app.get('/chat',async(req,res)=>{
//     const userQuestion = req.body.userQuestion
//     console.log("question",userQuestion)
//     const response = await openai.chat.completions.create({
//         model:'gpt-3.5-turbo',
//         messages:[{"role":"user","content":userQuestion}],
//         max_tokens:28,
//     })
//     console.log("response",response.choices[0].message)
//     res.send(response.choices[0].message.content)
// })
connectDb()
    .then(() => {
        console.log('Database connection succeeded');
        // Start the server
        app.listen(port, () => console.log('Server started on 8080'));
    })
    .catch((err) => console.log(err));

    module.exports = app;