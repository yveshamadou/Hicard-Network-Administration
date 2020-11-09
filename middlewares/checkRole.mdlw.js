const express = require('express')
const jwt_decode = require('jwt-decode')
const _Cookies = require('../models/cookies.model')
const app = express()

const _cookies = new _Cookies()

let hasToBe = (role) => {
    return hasToBe[role] || (hasToBe[role] = (req, res, next) => {
        let cookies = _cookies.parseCookies(req)
        let token = jwt_decode(cookies.x_datas)
        if (token.roles[role]/*  && token.roles[role].length > 0 */) {
            next()
        }else{
            res.status(401).send("Not Allowed")
        }
    })
}

module.exports = hasToBe
