const express = require('express')
const bodyParser = require('body-parser')
const cors = require ('cors')
require("dotenv").config();
const OpenAI = require("openai");
//local 
//import db promise
const connectDb = require('./db.js')
// import controllers routers
const posteRoutes = require('./controllers/PosteController.js')
const commentRoutes = require('./controllers/CommentController.js')
const app = express()


const openai = new OpenAI({
  apiKey:"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" // This is also the default, can be omitted
});

const userRoutes = require('./routes/userRoutes');
//Midleware to parse requeste body to json
app.use(bodyParser.json())
app.use(cors())

app.use('/api/v1/', userRoutes);

app.use('/api/v1/postes',posteRoutes)
app.use('/api/v1/comments/',commentRoutes)

// const openai = new OpenAIApi(configuration);

app.post("/find-complexity", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 64,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });

    console.log("response",response)
    return res.status(200).json({
      success: true,
      data: response.data.choices[0].text,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "There was an issue on the server",
    });
  }
});

connectDb()
    .then(()=>{
        console.log('database connection succeeded')
        // start the server
        app.listen(8080,()=> console.log('server started on 8080'))
    })
    .catch(err=> console.log(err))

