const express = require("express")
const path = require("path")
const app = express()
app.use(express.json())

const https = require("https")   // https 통신을 하게 하는 패키지
const fs = require("fs")   // 파일을 가져올때 사용하는 패키지

const sslOptions = {
    "key": fs.readFileSync(path.join(__dirname, "ssl/key.pem")),   // public key의 경로
    "cert": fs.readFileSync(path.join(__dirname, "ssl/cert.pem")),   // private key의 경로
    "passphrase": "1234"
}


// app.get("*", (req, res, next) => {

//     const protocol = req.protocol

//     if (protocol == "https") {
//         next()
//     } else {
//         const destination = `https://${req.hostname}:8443${req.url}`
//         console.log(destination)
//         res.redirect(destination)
//     }
// })

// 외부 API 파일 import
const accountApi = require("./router/account")
app.use("/account", accountApi)

const chatApi = require("./router/chat")
app.use("/chat", chatApi)

const pagesApi = require("./router/pages")
app.use("/", pagesApi)

// http 웹서버 열어주는 API
app.listen(8000, () => {
    console.log("8000번 포트에서 Web Server 실행")
})

// https 웹서버 열어주는 API
https.createServer(sslOptions, app).listen(8443, () => {
    console.log("8443번 포트에서 SSL Web Server 실행")
})