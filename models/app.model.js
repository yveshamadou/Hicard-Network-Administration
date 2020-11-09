const axios = require('axios')
const hicardConfig = require('../config/hicard.config')

class App {
    static getToken(cb) {
        let url = hicardConfig.getUrlsActivator.hostname + hicardConfig.getUrlsActivator.url.getLoginKey
        axios.post(url, {
            apiKey: hicardConfig.apiKey
        })
        .then(function (response) {
            cb(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })
    }
}
module.exports = App