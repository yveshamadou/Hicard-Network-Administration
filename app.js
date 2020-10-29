const express = require('express')
const app = express()

const router = require('./routes/routing.route')
app.use(router)

let port = process.env.PORT || 2000
app.listen(port, function () {
    console.log("Listening on port " + port)
})
