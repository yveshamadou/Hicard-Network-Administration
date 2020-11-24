const express = require('express')
const app = express()
const Application = require("../models/app.model")
const M_Cookies = require('../models/cookies.model')
const axios = require('axios').default

const cookies = new M_Cookies()

app.use((req, res, next) => {
    let cookies_list = cookies.parseCookies(req)
    if (cookies_list.ACCESS_TOKEN) {
        next()
    } else {
        res.redirect('/logout')
    }

})

module.exports = app