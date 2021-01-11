const express = require('express')
const M_Cookies = require('../models/cookies.model')
const jwt_decode = require('jwt-decode');

const app = express()
const m_cookies = new M_Cookies()

let checking = () => {
    return checking || (checking = (req, res, next) => {
        let cookies = _cookies.parseCookies(req)
        console.log(cookies);
        if (cookies.ACCESS_TOKEN) {
            if (jwt_decode(cookies.ACCESS_TOKEN).hc_na_role == "SystemAdministrator") {
                res.redirect("/user_network")
            } else if (jwt_decode(cookies.ACCESS_TOKEN).hc_na_role  == "NetworkAdministrator") {
                res.redirect("/user_network")
            } else if (jwt_decode(cookies.ACCESS_TOKEN).hc_na_role  == "FacilityAdministrator") {
               res.redirect("/user_facility" )
            }else {
               res.redirect("/logout")
            }
            next()
        } else {
            res.redirect("/logout")
        }
    
        
    })
}

module.exports = checking