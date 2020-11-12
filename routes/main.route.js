const express = require('express')
const app = express()
const config = require('../config/hicard.config')


app.get('/login', function (req, res) {
    res.render('login', {
        page: "login",
        authenticationParams: config.authenticationParams
    })
})

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

app.get('/settings', function (req, res) {
    res.render('settings', {
        page: "settings"
    })
})


module.exports = app