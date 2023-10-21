const OpenAI = require('openai')
const config = require('../config/config.js')

const openai = new OpenAI({
    apiKey:config.CHAT_API_KEY
})

exports.gptResponse = async(req,res)=>{
    const userQuestion = req.body.userQuestion
    // console.log("question",userQuestion)
    const response = await openai.chat.completions.create({
        model:'gpt-3.5-turbo',
        messages:[{"role":"user","content":userQuestion}],
        max_tokens:100,
    })
    // console.log("response",response.choices[0].message)
    res.send(response.choices[0].message.content)
}