const { JSDOM } = require("jsdom")
const axios = require('axios')

class EmptyResult extends Error {
    constructor(){
        super("the result is empty")
    }
}

async function receiveData(url){
    let options = {
        method: 'GET',
        url: url
    }

    let res=await axios.request(options)
    return res.data
}

function parseData(data,selector){
    let dom = new JSDOM(data)
    let document = dom.window.document

    let result=document.querySelector(selector)

    return result
}

async function extractData(url,querySelector,mode=0,regex){
    let html=await receiveData(url)
    let parsedData = parseData(html,querySelector)
    let result

    if(!parsedData){
        throw new EmptyResult
    }

    switch(mode) {
        case 0:
            result= parsedData.textContent
            break
        case 1:
            result= parsedData.innerHTML
            break
        default:
            throw `\n${mode} is not a valid mode \nPlease select: \n0 - text mode: get the textContent value \n1 - html mode: get the innerHTML value`
    }

    if(regex){
        result=result.match(regex)
    }   

    if (typeof(result)==="object"){
        if (result.length===1){
            result=result[0]
        }
    }

    return result
    
}

module.exports={
    extractData,
    EmptyResult
}