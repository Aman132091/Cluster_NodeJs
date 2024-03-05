const express = require("express")
const app = express()
const PORT = 8989

app.get('/',(req,res)=>{
    return res.json({message:`Hello Welcome To My World ${process.pid}`})
})

app.listen(PORT,()=> console.log(`Server listened at http://localhost:${PORT}`))