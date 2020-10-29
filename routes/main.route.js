const express = require('express')
const app = express()
//const authenticationParams = require('../config/authentication.config')


app.get('/', function (req, res) {
    res.render('user_network', {
        page: "user_network"
    })
})

app.get('/user_provider_details', function (req, res) {
    res.render('user_provider_details', {
        page: "user_provider_details"
    })
})

app.get('/user_provider', function (req, res) {
    res.render('user_provider', {
        page: "user_provider"
    })
})

app.get('/user_network_details', function (req, res) {
    res.render('user_network_details', {
        page: "user_network_details"
    })
})

app.get('/user_facility_details', function (req, res) {
    res.render('user_facility_details', {
        page: "user_facility_details"
    })
})

app.get('/access', function (req, res) {
    res.render('access', {
        page: "access"
    })
})


module.exports = app