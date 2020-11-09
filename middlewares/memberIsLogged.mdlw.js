const express = require('express')
const M_Cookies = require('../models/cookies.model')

const app = express()
const m_cookies = new M_Cookies()

app.use(function (req, res, next) {
    let cookies = m_cookies.parseCookies(req)
    if (cookies.x_datas) {
        next()
    } else {
        res.send('Go to the Login Page')/* .redirect('/login') */
    }
})

module.exports = app