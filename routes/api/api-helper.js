const config = require('../../config/global.config')

class Helper {
    static isGuid(value) {   
        var regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        var match = regex.exec(value)
        return match != null
    }

    static findElement(value, field, tab) {   
        let found = false
        let i = 0
        while (i < tab.length && !false) {
            if (field) { 
                if (tab[i][field] == value) {
                    found = i
                }
            }else{
                if (tab[i] == value) {
                    found = i
                }
            }
            i++
        }
        return found
    }
    
    static swaggerInitialization(value) {
        return {
            swaggerDefinition: {
                openapi: '3.0.8',
                info: {
                    title: 'Hicard Administration APIs',
                    description: 'Hicard Administration APIs Documentation',
                    contact: {
                        name: "Landry onguene"
                    },
                    servers: [config.hostname]
                }
            },
            apis: ["routes/api/*.js"],
        }
    }
}
module.exports = Helper