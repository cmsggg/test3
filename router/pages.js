const router = require("express").Router()
const path = require("path")


router.get("/mainPage", (req, res) => {
    // res.sendFile(__dirname + "../index.html")
    res.sendFile(path.join(__dirname, "../index.html"))
})

module.exports = router