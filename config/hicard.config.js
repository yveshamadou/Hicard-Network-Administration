function getRandomNumberBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

var hicardConfig = {
    baseUrl: "https://hicard_api_test.asmlogic.com/api",
    baseUrl2: "https://hicard_api_test.asmlogic.com",
    apiKey: "BDD2582B-2968-49B5-A220-3C1932FC8F03",

    getUrlsActivator: {
        hostname: "https://activatorapi.asmlogic.com/api/",
        version: "v1",
        url: {
            getLoginKey: "security/apiLogin",
        }
    },

    authenticationParams: {
        client_Id:"15482EB5-17C9-44C2-900C-88FAF17ED0C4",
        secret : "36128C5E-C2FC-44CD-AA3B-CC0236C1DB67",
        redirect_uri:"http://localhost:2000/authentication",
        response_type:"id_token",
        scope:"open_id email hc.na",
        version: "v1",
        baseUrl: "https://auth_eval.asmlogic.com/api",
        baseUrl2: "https://auth_eval.asmlogic.com",
        state : "mystate_user_id",
        lastVersionNumber : getRandomNumberBetween(2,9998577788859958),
        postUrl : {
            security : {
                newApplicationUser : "/security/newApplicationUser",
                encodeActivatorV1AccessToken : "/security/encodeActivatorV1AccessToken",
                updateUserAttributes : "/security/updateUserAttributes"
            }
        },
        getUrl : {
            encodeActivatorV1AccessToken : "connect/encodeActivatorV1AccessToken"
        }
    },
    
    hc_na_role : {
        systemAdmin : "SystemAdministrator",
        networkAdmin : "NetworkAdministrator",
        facilityAdmin : "FacilityAdministrator",
        user : "User",
    },
    
    getAPIs: {
        verifyUserExist: "medicalnetworkusers",
        medicalnetworks: "medicalnetworks",
    },
    postAPIs: {
        medicalnetworks: "medicalnetworks",
        medicalnetworkusers: "medicalnetworkusers",
        medicalnetworkusersAssociatesToNetwork: "medicalnetworkusers",
    },
    putAPIs: {
        medicalnetworks: "medicalnetworks",
        medicalnetworkusers: "medicalnetworkusers",
    },
}

module.exports = hicardConfig;