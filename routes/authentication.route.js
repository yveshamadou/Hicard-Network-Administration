const createError = require('http-errors')
const express = require('express')
//const User = require('../models/user.model')
const M_Cookies = require('../models/cookies.model')
const jwt_decode = require('jwt-decode');
const axios = require('axios').default;
//const authenticationParams = require('../config/authentication.config')
const hicardConfig = require('../config/hicard.config');

const app = express()
const m_cookies = new M_Cookies()

/**app.get('/logout', function (req, res) {
    m_cookies.deleteCookie(res, 'memberGuid')
    m_cookies.deleteCookie(res, 'token')
    res.redirect('/login')
})**/




module.exports = app