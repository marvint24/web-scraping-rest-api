const express = require('express')
const {extractData,EmptyResult} = require('./extractionTool.js')
const app = express()
const port = 5200

class MissingValueError extends Error {
    constructor(){
        super("url or qS parameter missing")
    }
}

app.get("/",async (req,res)=>{
    try{
        let url = req.query.url
        let qS = req.query.qS
        let mode = req.query.mode
        let regex = req.query.regex

        // console.log(`URL: ${url}\nqS: ${qS}\nmode: ${mode}\nregex: ${regex}`)

        if(!(url) || !(qS)){
            throw new MissingValueError
        }

        url = decodeURIComponent(req.query.url)
        qS = decodeURIComponent(req.query.qS)
         
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
        if (err instanceof MissingValueError){
            res.status(400)
            res.json({"error":"url or qS parameter missing"})
            return false
        }
        else if(err.isAxiosError){
            if(err.code === 'ENOTFOUND'){
                res.status(404)
                res.json({"error":"the specified server could't be reached"})
                return false
            }
            else if(err.code === 'ERR_BAD_REQUEST'){
                res.status(404)
                res.json({"error":"the specified site could't be reached"})
                return false
            }
            else{
                res.status(500)
                res.json({"error":"unspecified error encountered while processing the request"})
                return false
            }
        }
        else if(err instanceof EmptyResult){
            res.status(404)
            res.json({"error":"the result is empty"})
            return false
        } 
        else if(err instanceof SyntaxError){
            if (err.message.includes("Invalid regular expression")){
                res.status(400)
                res.json({"error":"Invalid regular expression"})
                return false
            }
        }   

        res.status(500)
        res.json({"error":"unspecified error encountered"})
        return false
    
    }
    
})


app.listen(
    port,
    ()=>console.log(`Running at Port ${port}`)
)
