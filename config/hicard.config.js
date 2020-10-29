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


    
    getAPIs: {
        memberGet: "/members",
    },
    postAPIs: {
        /* memberGet: "/member/verify", */
    },
}

module.exports = hicardConfig;