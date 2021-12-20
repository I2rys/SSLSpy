//Dependencies
const Got = require("got")

//Main
describe("valid domain", ()=>{
    it("should return the specified domain SSL information", async()=>{
        var { body, statusCode } = await Got("http://localhost:8080?domain=google.com")
        body = JSON.parse(body)
    
        expect(statusCode).toEqual(200)
        expect(body).toHaveProperty("data")
    })
})

describe("Invalid domain", ()=>{
    it("should return an error", async()=>{
        await Got("http://localhost:8080?domain=invalid_domain").catch((err)=>{
            expect(err.toString()).toContain("HTTPError: Response code 406 (Not Acceptable)")
        })
    })
})