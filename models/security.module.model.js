const axios = require('axios').default
const api = require('../config/hicard.config')
const M_Cookies = require('../models/cookies.model')

const cookies = new M_Cookies()

class SecurityModule{
    constructor(req) {
        let cookies_list = cookies.parseCookies(req)
        //Setting securityToken as Default in the axios headers 
        axios.defaults.headers['Authorization'] = 'Bearer '+cookies_list.ACCESS_TOKEN
    }
    
    getRequest(method, patch = null) {
        return new Promise((resolve, reject) => {
            if (api.authenticationParams.getUrl[patch] == undefined) {
                reject(new Error("404: This URL doesn't exist"))
            }
            let url = ""
            if (patch != undefined) {
                let paramsList = params.map(value => ('/' + value))
                url = api.authenticationParams.baseUrl2 + '/' + api.getAPIs[method] + paramsList
            } else {
                url = api.authenticationParams.baseUrl2 + '/' + api.getAPIs[method]
            }

            let request = {
                method: 'get',
                url: url,
            }
            axios(request)
                .then(function (response) {
                    if (response.data.errors.length > 0) {
                        reject(response)
                    } else {
                        resolve(response)
                    }
                })
                .catch(function (error) {
                    reject(error.response)
                })
        })
    }

    postRequest(method,client, patch, datas) {
        return new Promise((resolve, reject) => {
            if (api.authenticationParams[method] == undefined) {
                reject(new Error("404: This URL doesn't exist"))
            }
            let url = api.authenticationParams.baseUrl + api.authenticationParams.postUrl[client][patch]
            //axios.defaults.headers.Authorization = "Bearer " +token
            axios.post(url, datas)
                .then(function (response) {
                    if (response.data.errors.length > 0) {
                        reject(response)
                    } else {
                        resolve(response)
                    }
                })
                .catch(function (error) {
                    reject(error.response)
                })
        })
    }
}

module.exports = SecurityModule