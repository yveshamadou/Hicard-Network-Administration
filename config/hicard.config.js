var hicardConfig = {
    baseUrl: "https://hicard_api_test.asmlogic.com/api",
    apiKey: "BDD2582B-2968-49B5-A220-3C1932FC8F03",

    getUrlsActivator: {
        hostname: "https://activatorapi.asmlogic.com/api/",
        version: "v1",
        url: {
            getLoginKey: "security/apiLogin",
        }
    },

    authenticationParams: {
        client_Id:"3e868d54-71e6-41a4-808d-f29a509292ba",
        redirect_uri:"http://localhost:5000/authentication",
        response_type:"id_token",
        scope:"open_id",
        version: "v1",
        baseUrl: "https://auth_eval.asmlogic.com/api",
    },
    
    getAPIs: {
        medicalnetworks: "medicalnetworks",
    },
    postAPIs: {
        medicalnetworks: "medicalnetworks",
    },
    putAPIs: {
        medicalnetworks: "medicalnetworks",
    },
}

module.exports = hicardConfig;