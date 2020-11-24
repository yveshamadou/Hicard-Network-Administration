const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')

const app = express()


// view engine setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))

//Middlewares Calling
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
/* const appAuthentication = require('../middlewares/authenticateApp.mdlw')
const memberIsLogged = require('../middlewares/memberIsLogged.mdlw') */

//app.use(appAuthentication) //The app must be logged in before any action

//Routes Calling
const authenticationRoutes = require('./authentication.route')
const mainRoutes = require('./main.route')
const errorsRoutes = require('./errors.route')

app.use(authenticationRoutes)

/* app.use(memberIsLogged)  *///Middleware : From here, the member must be logged in to access the app below

app.use(mainRoutes)
app.use(errorsRoutes)

module.exports = app