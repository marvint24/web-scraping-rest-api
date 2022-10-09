const { JSDOM } = require("jsdom")
const axios = require('axios')

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


//Example
// async function main(){
//     let url="https://mods.factorio.com/mod/bigger-artillery"
//     let querySelector="body > div.container > div > div.panel.pt0.pb0.mb32 > div.panel-inset-lighter.flex-column.p0 > div.flex.z1 > div.panel-inset-lighter.m0.w256.sm-none > div > div:nth-child(3)"
    
//     let res=await extractData(url,querySelector,0,/\d+/g)
    
//     console.log(res)
     
// }

// main()


module.exports={
    "extractData":extractData
}