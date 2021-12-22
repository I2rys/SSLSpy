//Dependencies
const Express_Param = require("express-param")
const GDC = require("get-domain-certificate")
const Express = require("express")

//Variables
const Web = Express()
const Port = process.env.PORT || 8080

///Configurations
//Express
Web.use(Express_Param())

//Main
Web.get("/", async function(req, res){
    const domain = req.fetchParameter(["domain"]).domain

    if(!domain){
        return res.json({
            "status": 406,
            "message": "Invalid domain parameter/parameter value is empty."
        }).end()
    }

    try{
        const result = await GDC(domain)

        res.json({
            "status": 200,
            "message": "Successfully grabbed the specified domain SSL information.",
            "data": result
        }).end()
    }catch{
        return res.json({
            "status": 406,
            "message": "Invalid domain parameter/parameter value is empty.",
            "data": []
        }).end()
    }
})

Web.listen(Port, ()=>{
    console.log(`[SSLSpy] Server is running in port ${Port}`)
})