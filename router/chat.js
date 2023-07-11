const router = require("express").Router()
const client = require("mongodb").MongoClient

router.post("/", async (req, res) => {
    const {id, message} = req.body

    console.log(id, message)

    const result = {
        "success": false,
        "message": null
    }

    let conn = null

    try {
        if (message == "") throw new Error({"message": "message가 비어있어용"})
        
        conn = await client.connect("mongodb://localhost:27017")

        const document = {
            "id": id,
            "message": message
        }
        await conn.db("stageus").collection("chat").insertOne(document)
        result.success = true
    } 
    catch (err) {
        console.log(`POST /chat Error : ${err.message}`)   // 분명 req 객체 안에 뭔가 있을듯?
        result.message = err.message
    } 
    finally {
        if (conn) conn.close()
        res.send(result)
    }
})

router.get("/", async (req, res) => {

    const result = {
        "success": false,
        "message": null,
        "data": null
    }

    console.log("hello")

    let conn = null

    try {
        conn = await client.connect("mongodb://localhost:27017")

        const data = await conn.db("stageus").collection("chat").find().toArray()
        result.success = true
        result.data = data
    } 
    catch (err) {
        console.log(`GET /chat Error : ${err.message}`)   // 분명 req 객체 안에 뭔가 있을듯?
        result.message = err.message
    } 
    finally {
        if (conn) conn.close()
        res.send(result)
    }
})

module.exports = router