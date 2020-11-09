const express = require('express')
const app = express()
const Application = require("../models/app.model")
const M_Cookies = require('../models/cookies.model')
const axios = require('axios').default

const cookies = new M_Cookies()

app.use((req, res, next) => {
    let cookies_list = cookies.parseCookies(req)
    if (cookies_list.securityToken) {

        //Setting securityToken as Default in the axios headers 
        axios.defaults.headers.common['securityToken'] = cookies_list.securityToken
        next()
    } else {
        Application.getToken(function (response) {
            if (response.isAuthenticated) {
                cookies.setCookieSecurityToken(res, response.securityToken, new Date(Number(new Date()) + 900000))
                
                //Setting securityToken as Default in the axios headers 
                axios.defaults.headers.common['securityToken'] = response.securityToken
                next()
            } else {
                res.send('Application not found. Sorry something happend')
            }
        })
    }

})

module.exports = app