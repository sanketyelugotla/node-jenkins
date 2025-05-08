const express = require("express")

const app = express()

app.get('/', (req, res) => {
    res.send("Backend app running")
})

app.listen(3000, () => {
    console.log("Listening on 3000")
})