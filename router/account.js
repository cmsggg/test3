const router = require("express").Router()
const { Client } = require("pg")

router.get("/", (req, res) => {

    const result = {
        "success": true,
        "message": "",
        "data": {
            "id": "stageus",
            "pw": "1234",
            "name": "최민석"
        }
    }

    res.send(result)
})

router.post("/login", async (req, res) => {

    const {id, pw} = req.body

    const result = {
        "success": false,
        "message": ""
    }

    const config = new Client({
        "user": "ubuntu",
        "password": "1234",
        "host": "localhost",
        "post": "5432",
        "database": "backend"
    })

    try {
        await config.connect()
        const sql = "SELECT * FROM account WHERE id=$1 AND pw=$2"
        const values = [id, pw]
        const data = await config.query(sql, values)

        const row = data.rows
        if (row.length > 0) {
            result.success = true
        } else {
            result.message = "해당하는 회원정보가 없습니다."
        }
    } catch(err) {
        console.log("/account/login", err.message)
        result.message = err.message
    }

    config.end()
    res.send(result)
})

module.exports = router