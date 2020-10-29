const express = require('express')
const app = express()
const Helper = require('./api/api-helper')
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const swaggerDocs = swaggerJsDoc(Helper.swaggerInitialization())
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


const rolesRoutes = require('./api/roles.api.route')
const usersRoutes = require('./api/users.api.route')
const networksRoutes = require('./api/networks.api.route')
const facilitiesRoutes = require('./api/facilities.api.route')
const providersRoutes = require('./api/providers.api.route')

app.use(rolesRoutes)
app.use(usersRoutes)
app.use(networksRoutes)
app.use(facilitiesRoutes)
app.use(providersRoutes)


module.exports = app