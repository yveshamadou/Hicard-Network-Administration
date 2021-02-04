const express = require('express')
const app = express()
var session = require('express-session')
const config = require('../config/hicard.config')
const jwt_decode = require('jwt-decode');
const Application = require("../models/app.model")
const M_Cookies = require('../models/cookies.model')
const securityModel = require ('../models/security.module.model')
const HicardRequest = require ('../models/hicard.request.model')
const hasToBe = require('../middlewares/checkRole.mdlw')
const m_cookies = new M_Cookies()

//Session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'hicard-flash-session',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


//Middlewares
const appAuthentication = require('../middlewares/authenticateApp.mdlw')
const appCheckRoleAccess = require('../middlewares/memberRoleAccess.mdlw')

app.get('/login', function (req, res) {
    res.render('login', {
        page: "login",
        authenticationParams: config.authenticationParams
    })
})

app.get('/test', function (req, res) {
    res.render('test', {
        page: "test",
        authenticationParams: config.authenticationParams
    })
})

app.get('/', function (req, res,next) {
    let cookies_list = m_cookies.parseCookies(req)
    if (cookies_list.ACCESS_TOKEN) {
        if (jwt_decode(cookies_list.ACCESS_TOKEN).hc_na_role == "SystemAdministrator") {
            res.redirect("/user_network")
        } else if (jwt_decode(cookies_list.ACCESS_TOKEN).hc_na_role  == "NetworkAdministrator") {
            res.redirect("/user_network")
        } else if (jwt_decode(cookies_list.ACCESS_TOKEN).hc_na_role  == "FacilityAdministrator") {
           res.redirect("/user_facility" )
        }else {
           res.redirect("/logout")
        }
    } else {
        res.render('login', {
            page: "login",
            authenticationParams: config.authenticationParams
        })
    }
    
})

app.get('/authentication', function (req, res) {
    let query = req._parsedOriginalUrl.query.split('&')
    let cookies_list = m_cookies.parseCookies(req)
    let datas = {
        id_token : (query[0].split('=')[1])
    };
    
    Application.getToken(function (response) {
        if (response.isAuthenticated) {
            jwtTokenDecode = jwt_decode(datas.id_token);
            let requestData = {
                "claims": [],
                "client_id": config.authenticationParams.client_Id,
                "client_secret": config.authenticationParams.secret,
                "id_token": datas.id_token,
                "activator_security_token": response.securityToken,
                "state": config.authenticationParams.state
            }
            let security = new securityModel(req)
            security.postRequest('postUrl','security', 'encodeActivatorV1AccessToken', requestData)
            .then((result) => {
                if (result.data.errors == null) {
                    res.render('errors/404', {
                        page: "errors/404",
                        errors : {code : "404", description : result.data.errors}
                    })
                } else {
                    //console.log(result.data.payload.access_token);
                    m_cookies.setCookie(res, "ACCESS_TOKEN", result.data.payload.access_token, new Date(result.data.payload.expiration_date_time))
                    m_cookies.deleteCookie(res, "securityToken");
                    //console.log(jwt_decode(result.data.payload.access_token));
                    if (jwt_decode(result.data.payload.access_token).hc_na_role != undefined && jwt_decode(result.data.payload.access_token).hc_na_role != null && jwt_decode(result.data.payload.access_token).hc_na_role != "") {
                        res.render('authenticate', {
                            page: "authenticate",
                            baseUrl : config.baseUrl2,
                            baseUrl2 : config.authenticationParams.baseUrl2,
                            roles : ""
                        })
                    } else {
                        res.render('errors/404', {
                            page: "errors/404",
                            errors : {code : "405", description: 'You do not have access to this platform. Please contact a site administrator for more information. Thank you'}
                        })
                    }
                    
                    
                    
                }
                
            }).catch((err) => {
                console.log(err);
                res.render('errors/404', {
                    page: "errors/404",
                    errors : {code : "500", description : err.data.errors}
                })
            })
        } else {
            res.send('Application not found. Sorry something happend')
        }
    })
    
    
    
})

//app.use(appCheckRoleAccess())
app.use(appAuthentication)
app.use(hasToBe(config.hc_na_role.facilityAdmin))

app.get('/user_facility', function (req, res) {
    let cookies = m_cookies.parseCookies(req)
    
    role = jwt_decode(cookies.ACCESS_TOKEN).hc_na_role
    res.render('user_facility', {
        page: "user_facility",
        baseUrl : config.baseUrl2,
        baseUrl2 : config.authenticationParams.baseUrl2,
        roles : (role == "SystemAdministrator" ? "super" : "network")
    })
})

app.get('/user_facility_details', function (req, res) {
    let cookies = m_cookies.parseCookies(req)
    
    role = jwt_decode(cookies.ACCESS_TOKEN).hc_na_role
    res.render('user_facility_details', {
        page: "user_facility_details",
        baseUrl : config.baseUrl2,
        baseUrl2 : config.authenticationParams.baseUrl2,
        roles : (role == "SystemAdministrator" ? "super" : "network")
    })
})

app.post('/update_users', function (req, res) {
    let cookies = m_cookies.parseCookies(req)
    let body = req.body
    let requestData = {
        "createByUserJwtToken": cookies.ACCESS_TOKEN,
        "userId": body.usersGuid,
        "clientID": config.authenticationParams.client_Id,
        "clientSecret": config.authenticationParams.secret,
        "attributes": [
          {
            "attributeId": "e367e62a-55b6-4ede-b340-72b2e26765f1",
            "value": body.usersRoles
          }
        ]
    }
    security.postRequest('postUrl','security', 'updateUserAttributes', requestData)
    .then((result) => {
        if (result.data.errors == null) {
            res.render('errors/404', {
                page: "errors/404",
                errors : {code : "404", description : result.data.errors}
            })
        } else {
            res.redirect(body.currentUrl)
        }
        
    }).catch((err) => {
        console.log(err);
        res.render('errors/404', {
            page: "errors/404",
            errors : {code : "404", description : err.data.errors}
        })
    })
});

app.post('/create_users', function (req, res) {
    console.log("=======body======");
    let security = new securityModel(req)
    let body = req.body
    console.log(body);
    console.log("========body==========");
    
    if (body.usersGuid != undefined) {
        console.log(body.usersGuid);
        let hicard = new HicardRequest(req)
        let paramaters = [body.usersGuid]
        hicard.verifyUserExist('verifyUserExist', paramaters)
        .then((resp) => {
            console.log("=====createDatas=======");
            console.log(resp.data);
            console.log("=====END-createDatas=======");
            if (resp.data.errors.length > 0) {
                res.render('errors/errors', {
                    page: "errors/errors",
                    errors : "Contact your Administation",
                    previousUrl : body.currentUrl
                })
            } else {
                if (resp.data.payload != null) {
                    let idUser = resp.data.payload.id;
                    let params = {
                        id : idUser,
                        networkID : body.usersNetworkGuid,
                        facilityID : ""
                    }
                    hicard.postRequestWithParams('medicalnetworkusersAssociatesToNetwork',params, {"role": body.usersRoles})
                    .then((associate) => {
                        console.log('associate');
                        console.log(associate.data);
                        console.log("==========body.usersFacilityGuid=====");
                        console.log(body.usersFacilityGuid);
                        console.log("==========END-body.usersFacilityGuid=====");
                            if (associate.data.errors.length > 0) {
                                res.render('errors/errors', {
                                    page: "errors/errors",
                                    errors : {code : "404", description : "associate user error. Please try again later..."},
                                    previousUrl : body.currentUrl
                                })
                            } else {
                                console.log('associate success');
                                if (body.usersFacilityGuid != 'undefined' && body.usersFacilityGuid != undefined) {
                                    let dat = {
                                        id : idUser,
                                        facilityID : (body.usersFacilityGuid == undefined ? "" : body.usersFacilityGuid)
                                    }
                                    hicard.postRequestWithParams('medicalnetworkusersAssociatesToNetwork',dat, {"role": body.usersRoles})
                                    .then((associateF) => {
                                        console.log('associateF');
                                        console.log(associateF.data);
                                            if (associateF.data.errors.length > 0) {
                                                res.render('errors/errors', {
                                                    page: "errors/errors",
                                                    errors : {code : "404", description : "Assiociated failed. Please contact your system administrator."},
                                                    previousUrl : body.currentUrl
                                                })
                                            } else {
                                                console.log('associate success');
                                                console.log(associateF.data.payload);
                                                req.flash("success", "Succesfully Add")
                                                res.redirect(body.currentUrl)
                                            }
                                        
                                    }).catch((err2) => {
                                        console.log('err.data22222');
                                        console.log(err2.data);
                                        res.render('errors/errors', {
                                            page: "errors/errors",
                                            errors : {code : "422", description : "This user already exists. it is impossible to create it again. Please enter another email address then try again..."},
                                            previousUrl : body.currentUrl
                                        })
                                    })
                                } else {
                                    console.log('associate success');
                                    console.log(associate.data.payload);
                                    res.locals.success = "Succesfull"
                                    res.redirect(body.currentUrl)
                                }
                            }
                        
                    }).catch((err) => {
                        console.log('err.data');
                        console.log(err.data);
                        res.render('errors/errors', {
                            page: "errors/errors",
                            errors : {code : "422", description : "Please enter another email address then try again..."},
                            previousUrl : body.currentUrl
                        })
                    })
                }
            }
        }).catch((er) => {
            console.log("===========er+=====================");
            console.log(er.data);
            console.log("===========END-er+=====================");
        })
        
    } else {
        let requestData = {
            "applicationID": config.authenticationParams.client_Id,
              "emailAddress": body.usersEmail,
              "userName": body.usersEmail,
              "firstName": body.usersFirstName,
              "lastName": body.usersLastName,
            "attributes": [
              {
                "attributeId": "e367e62a-55b6-4ede-b340-72b2e26765f1",
                "value": body.usersRoles
              }
            ]
        }
        console.log("Second Post");
        security.postRequest('postUrl','security', 'newApplicationUser', requestData)
        .then((result) => {
            console.log("newApplicationUser");
            console.log(result.data);
            console.log("==END-newApplicationUser====");
            if (result.data.errors == null) {
                res.render('errors/404', {
                    page: "errors/404",
                    errors : {code : "404", description : result.data.errors}
                })
            } else {
                if (result.data.payload == '00000000-0000-0000-0000-000000000000') {
                    res.render('errors/errors', {
                        page: "errors/errors",
                        errors : {code : "422", description : "This email address already exists. it is impossible to create it again. Please enter another email address then try again..."},
                        previousUrl : body.currentUrl
                    })
                } else {
                    let hicard = new HicardRequest(req)
                    let createDatas = {
                        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        "emailAddress": body.usersEmail,
                        "firstName": body.usersFirstName,
                        "lastName": body.usersLastName,
                        "userId": result.data.payload,
                        "networkRecordGuid": body.usersNetworkGuid,
                        "role": body.usersRoles,
                        "name": body.usersFirstName + " "+ body.usersLastName
                    }
                    console.log("=====createDatas=======");
                    console.log(createDatas);
                    console.log("=====END-createDatas=======");
                    hicard.putRequest('medicalnetworkusers', createDatas)
                    .then((datas) => {
                        console.log(datas.data);
                        if (datas.data.errors.length > 0) {
                            res.render('errors/errors', {
                                page: "errors/errors",
                                errors : {code : "422", description : "We encounter an error while adding this user to the selected network, please try again later..."},
                                previousUrl : body.currentUrl
                            })
                        } else {
                            console.log("medicalnetworkusers");
                            console.log(datas.data.payload);
                            let params = {
                                id : datas.data.payload,
                                networkID : body.usersNetworkGuid,
                                facilityID : ""
                            }
                            hicard.postRequestWithParams('medicalnetworkusersAssociatesToNetwork',params, {"role": body.usersRoles})
                            .then((associate) => {
                                console.log('associate');
                                console.log(associate.data);
                                console.log(body.usersFacilityGuid);
                                    if (associate.data.errors.length > 0) {
                                        res.render('errors/errors', {
                                            page: "errors/errors",
                                            errors : {code : "422", description : "associate user error. Please try again later..."},
                                            previousUrl : body.currentUrl
                                        })
                                    } else {
                                        console.log('associate success');
                                        if (body.usersFacilityGuid != 'undefined' && body.usersFacilityGuid != undefined) {
                                            let dat = {
                                                id : datas.data.payload,
                                                facilityID : (body.usersFacilityGuid == undefined ? "" : body.usersFacilityGuid)
                                            }
                                            hicard.postRequestWithParams('medicalnetworkusersAssociatesToNetwork',dat, {"role": body.usersRoles})
                                            .then((associateF) => {
                                                console.log('associateF');
                                                console.log(associateF.data);
                                                    if (associateF.data.errors.length > 0) {
                                                        res.render('errors/errors', {
                                                            page: "errors/errors",
                                                            errors : {code : "422", description : "This user already exists. it is impossible to create it again. Please enter another email address then try again..."},
                                                            previousUrl : body.currentUrl
                                                        })
                                                    } else {
                                                        console.log('associate success');
                                                        console.log(associateF.data.payload);
                                                        res.locals.success = "Succesfull"
                                                        res.redirect(body.currentUrl)
                                                    }
                                                
                                            }).catch((err2) => {
                                                console.log('err.data22222');
                                                console.log(err.data.errors);
                                                res.render('errors/errors', {
                                                    page: "errors/errors",
                                                    errors : {code : "422", description : "This user already exists. it is impossible to create it again. Please enter another email address then try again..."},
                                                    previousUrl : body.currentUrl
                                                })
                                            })
                                        } else {
                                            console.log('associate success');
                                            console.log(associate.data.payload);
                                            res.locals.success = "Succesfull"
                                            res.redirect(body.currentUrl)
                                        }
                                    }
                                
                            }).catch((err) => {
                                console.log('err.data');
                                console.log(err.data.errors);
                                res.render('errors/errors', {
                                    page: "errors/errors",
                                    errors : {code : "422", description : "This user already exists. it is impossible to create it again. Please enter another email address then try again..."},
                                    previousUrl : body.currentUrl
                                })
                            })
                        }
                        
                    }).catch((err) => {
                        console.log(err.data);
                        res.render('errors/errors', {
                            page: "errors/errors",
                            errors : {code : "422", description : "This user already exists. it is impossible to create it again. Please enter another email address then try again..."},
                            previousUrl : body.currentUrl
                        })
                    })
                
                }
                
            }
            
        }).catch((err) => {
            console.log(err);
            res.render('errors/404', {
                page: "errors/404",
                errors : {code : "404", description : err.data.errors}
            })
        })
    }
    
});


/* app.get('/user_provider', function (req, res) {
    let cookies = m_cookies.parseCookies(req)
    role = jwt_decode(cookies.ACCESS_TOKEN).hc_na_role
    
    res.render('user_provider', {
        page: "user_provider",
        baseUrl : config.baseUrl2,
        baseUrl2 : config.authenticationParams.baseUrl2,
        roles : (role == "SystemAdministrator" ? "super" : "network")
    })
})

app.get('/user_provider_details', function (req, res) {
    let cookies = m_cookies.parseCookies(req)
    role = jwt_decode(cookies.ACCESS_TOKEN).hc_na_role
    
    res.render('user_provider_details', {
        page: "user_provider_details",
        baseUrl : config.baseUrl2,
        baseUrl2 : config.authenticationParams.baseUrl2,
        roles : (role == "SystemAdministrator" ? "super" : "network")
    })
})


app.get('/access', function (req, res) {
    let cookies = m_cookies.parseCookies(req)
    role = jwt_decode(cookies.ACCESS_TOKEN).hc_na_role
    
    res.render('access', {
        page: "access",
        baseUrl : config.baseUrl2,
        baseUrl2 : config.authenticationParams.baseUrl2,
        roles : (role == "SystemAdministrator" ? "super" : "network")
    })
}) */

app.get('/settings', function (req, res) {
    let cookies = m_cookies.parseCookies(req)
    role = jwt_decode(cookies.ACCESS_TOKEN).hc_na_role
    
    res.render('settings', {
        page: "settings",
        baseUrl : config.baseUrl2,
        baseUrl2 : config.authenticationParams.baseUrl2,
        roles : (role == "SystemAdministrator" ? "super" : "network")
    })
})


app.use(hasToBe([config.hc_na_role.networkAdmin, config.hc_na_role.systemAdmin]))
app.get('/user_network', function (req, res) {
    let cookies = m_cookies.parseCookies(req)
    role = jwt_decode(cookies.ACCESS_TOKEN).hc_na_role
    res.render('user_network', {
        page: "user_network",
        baseUrl : config.baseUrl2,
        baseUrl2 : config.authenticationParams.baseUrl2,
        roles : (role == "SystemAdministrator" ? "super" : "network")
    })
})

app.get('/user_network_details', function (req, res) {
    let cookies = m_cookies.parseCookies(req)
    
    role = jwt_decode(cookies.ACCESS_TOKEN).hc_na_role
    res.render('user_network_details', {
        page: "user_network_details",
        baseUrl : config.baseUrl2,
        baseUrl2 : config.authenticationParams.baseUrl2,
        roles : (role == "SystemAdministrator" ? "super" : "network")
    })
})



module.exports = app