const express = require('express')
const jwt_decode = require('jwt-decode')
const _Cookies = require('../models/cookies.model')
const config = require('../config/hicard.config')
const app = express()

const _cookies = new _Cookies()

let hasToBe = (role) => {
    return hasToBe[role] || (hasToBe[role] = (req, res, next) => {
        let cookies = _cookies.parseCookies(req)
        let jwtToken = jwt_decode(cookies.ACCESS_TOKEN)
        
        let roles 
    
        if (jwtToken.hc_na_role == config.hc_na_role.systemAdmin) {
            
            roles = [config.hc_na_role.systemAdmin, config.hc_na_role.networkAdmin, config.hc_na_role.facilityAdmin]
        } else if (jwtToken.hc_na_role == config.hc_na_role.networkAdmin){
            roles = [config.hc_na_role.networkAdmin, config.hc_na_role.facilityAdmin]
        } else if (jwtToken.hc_na_role == config.hc_na_role.facilityAdmin) {
            roles = [config.hc_na_role.facilityAdmin]
        }else{
            roles = ["User"]
        }
        let token
        /* console.log('console.log(roles);', roles)
        console.log('jwtToken.hc_na_role', jwtToken.hc_na_role) */
        
        
        if (Array.isArray(role)) {
            role.forEach((rol,i) => {
                if ((roles.findIndex((element) => element == rol)) != -1) {
                    token = i
                }
            });
        }else{
            token = roles.findIndex((element) => element == role)
        }
        if (token != -1) {
            next()
        }else{
            res.redirect('/logout')
        }
    })
}

module.exports = hasToBe
