let database = {
    dbConfig : {
        server: "localhost",
        database: "HiCardNetworkAdministration",
        user: "sa",
        password: "12345678",
        port: 1433,
        options: {
            "enableArithAbort": true
        }
    },
    storedProcedures : {
        createFacility: "createFacility",
        createFacilityProvider: "createFacilityProvider",
        createNetwork: "createNetwork",
        createNetworkFacility: "createNetworkFacility",
        createNetworkProvider: "createNetworkProvider",
        createProvider: "createProvider",
        createRole: "createRole",
        createUser: "createUser",
        createUserFacility: "createUserFacility",
        createUserNetwork: "createUserNetwork",
        createUserRole: "createUserRole",
        FacilityOperations: "FacilityOperations",
        NetworkOperations: "NetworkOperations",
        ProviderOperations: "ProviderOperations",
        RoleOperations: "RoleOperations",
        UserOperations: "UserOperations",
    }
}

module.exports = database