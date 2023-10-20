const OpenAI = require('openai')

const openai = new OpenAI({
    apiKey:"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"
})

exports.gptResponse = async(req,res)=>{
    const userQuestion = req.body.userQuestion
    console.log("question",userQuestion)
    const response = await openai.chat.completions.create({
        model:'gpt-3.5-turbo',
        messages:[{"role":"user","content":userQuestion}],
        max_tokens:100,
    })
    console.log("response",response.choices[0].message)
    res.send(response.choices[0].message.content)
}