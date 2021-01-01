const axios = require('axios').default
const api = require('../config/hicard.config')
const M_Cookies = require('../models/cookies.model')
const jwt_decode = require('jwt-decode');

const cookies = new M_Cookies()


class HicardRequest{
    constructor(req) {
        let cookies_list = cookies.parseCookies(req)
        //Setting securityToken as Default in the axios headers 
        axios.defaults.headers['Authorization'] = 'Bearer '+cookies_list.ACCESS_TOKEN
    }
    
    
    getRequest(method, params = false) {
        return new Promise((resolve, reject) => {
            if (api.getAPIs[method] == undefined) {
                reject(new Error("404: This URL doesn't exist"))
            }
            let url = ""
            if (params && params.length > 0) {
                let paramsList = params.map(value => ('/' + value))
                url = api.baseUrl + '/' + api.getAPIs[method] + paramsList
            } else {
                url = api.baseUrl + '/' + api.getAPIs[method]
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

    postRequest(method, datas) {
        return new Promise((resolve, reject) => {
            if (api.postAPIs[method] == undefined) {
                reject(new Error("404: This URL doesn't exist"))
            }
            let url = api.baseUrl + '/' + api.getAPIs[method]

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
    
    postRequestWithParams(method,params = null, datas) {
        return new Promise((resolve, reject) => {
            if (api.postAPIs[method] == undefined) {
                reject(new Error("404: This URL doesn't exist"))
            }
            let url
            if (params.facilityID != "") {
                url = api.baseUrl + '/' + api.postAPIs[method] + '/'+params.id+'/facilities/'+params.facilityID+''
            } else {
                url = api.baseUrl + '/' + api.postAPIs[method] + '/'+params.id+'/networks/'+params.networkID+''
            }
            
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

    putRequest(method, datas) {
        return new Promise((resolve, reject) => {
            if (api.putAPIs[method] == undefined) {
                reject(new Error("404: This URL doesn't exist"))
            }
            let url = api.baseUrl + '/' + api.putAPIs[method]

            axios.put(url, datas)
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

    deleteRequest(method, datas) {
        return new Promise((resolve, reject) => {
            if (api.putAPIs[method] == undefined) {
                reject(new Error("404: This URL doesn't exist"))
            }
            let url = api.baseUrl + '/' + api.getAPIs[method]

            axios.put(url, datas)
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
    
    verifyUserExist(method, params = false) {
        return new Promise((resolve, reject) => {
            if (api.getAPIs[method] == undefined) {
                reject(new Error("404: This URL doesn't exist"))
            }
            let url = ""
            if (params && params.length > 0) {
                let paramsList = params.map(value => ('/' + value))
                url = api.baseUrl + '/' + api.getAPIs[method] + paramsList + '/details'
            } else {
                url = api.baseUrl + '/' + api.getAPIs[method] + '/details'
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
}

module.exports = HicardRequest