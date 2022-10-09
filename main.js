const express = require('express')
const {extractData} = require('./extractionTool.js')
const app = express()
const port = 5200

app.get("/",async (req,res)=>{
    try{
        let url = decodeURIComponent(req.query.url)
        let qS = decodeURIComponent(req.query.qS)
        let mode = req.query.mode
        let regex = req.query.regex

        console.log(`URL: ${url}\nqS: ${qS}\nmode: ${mode}\nregex: ${regex}`)
        
        if (mode){
            mode=parseInt(mode)
        }
        if (regex) {
            regex =decodeURIComponent(regex)
        }

        let result = await extractData(url,qS,mode,regex)
        
        res.json({'result' : result})
    }catch (err){
        console.log(err)
    }
    
})


app.listen(
    port,
    ()=>console.log(`Running at Port ${port}`)
)
