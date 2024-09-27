const express = require("express")

const app = express()

app.use("/", (req, res)=>{
    res.send("<h1>Wlecome to CodeMate❤❤</h1>")
})

app.use("/login", (req, res)=>{
    res.send("<h1> Welcome to Login page of CodeMate🙄🙄</h1>")
})

app.listen("0118", ()=>{
console.log("server is listening sucessfully on port 0118")
})