const express = require('express')
const Network = require('../../models/network.model')
const Result = require('../../models/result.model')
const Helper = require('./api-helper')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt_decode = require('jwt-decode')
const _Cookies = require('../../models/cookies.model')
const hasToBe = require('../../middlewares/checkRole.mdlw')
const HicardRequest = require('../../models/hicard.request.model')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())


/* Middleware: Must be Network Administrator */
/* app.use(hasToBe('networkAdministrator')) */
const _cookies = new _Cookies()

let IP_address, createdBy, hicardRequest
app.use((req, res, next) => {
    IP_address = req.connection.remoteAddress
    createdBy = jwt_decode(_cookies.parseCookies(req).x_datas).UserID
    hicardRequest = new HicardRequest(req)
    next()
})

const getNetworkInfos = function (action, req, res, activatorDatas = false) {
    let id = req.params.id
    if (Helper.isGuid(id)) {
        Network.getNetworkInfos(id, IP_address, action, function (response) {
            if (response.recordset.length > 0) {
                let datas = Result.setSuccessResult(activatorDatas ? activatorDatas : response.recordset)
                res.send(datas)
            }else{
                res.send(Result.setSuccessResult(null))
            }
        })
    } else {
        res.send(Result.setErrorResult("NetworkID must be a GUID"))
    }
}

const activeOrDeleteNetwork = function (action, req, res) {
    let id = req.params.id
    if (Helper.isGuid(id)) {
        Network.activeOrDeleteNetwork(id, createdBy, IP_address, action, function (response) {
            if (response.rowsAffected[0] == 1) {
                res.send(Result.setSuccessResult(id))
            } else {
                res.send(Result.setErrorResult("Network doesn't exist"))
            }
        })
    } else {
        res.send(Result.setErrorResult("NetworkID must be a GUID"))
    }
}

const createOrEditNetwork = function (action, req, res) {
    let NetworkID = req.body.id
    let Name = req.body.name
    if (Helper.isGuid(NetworkID)) {
        Network.createOrEditNetwork(NetworkID, Name, createdBy, IP_address, action, function (response) {
            if (response.rowsAffected[0] == 1) {
                res.send(Result.setSuccessResult(response.recordset))
            } else {
                if (action == 'update') {
                    res.send(Result.setErrorResult("Network doesn't exist"))
                } else {
                    res.send(Result.setErrorResult("Something went wrong"))
                }
            }
        })
    } else {
        res.send(Result.setErrorResult("NetworkID must be a GUID"))
    }
}

/**
 * @swagger
 * /networks/{id}:
 *  get:
 *      description: Use to get Network by id
 *      summary: Use to get Network by id
 *      parameters:
 *      - name: id
 *        description: id of the Network
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Networks
*/
app.get('/networks/:id', function (req, res) {
    hicardRequest.getRequest("medicalnetworks", [req.params.id]).then((result) => {
        if (result.data.errors.length == 0 && result.data.payload) {
            getNetworkInfos('getNetwork', req, res, result.data.payload)
        }else{
            res.send(Result.setSuccessResult(null))
        }
    }).catch((err) => {
        res.send(Result.setErrorResult("Something went wrong"))
    })
})

/**
 * @swagger
 * /networks/{id}/providers:
 *  get:
 *      description: Use to get Network's Providers by id
 *      summary: Use to get Network's Providers by id
 *      parameters:
 *      - name: id
 *        description: id of the Network
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Networks
*/
app.get('/networks/:id/providers', function (req, res) {
    getNetworkInfos('getNetworkProviders', req, res)
})

/**
 * @swagger
 * /networks/{id}/users:
 *  get:
 *      description: Use to get Network's Users by id
 *      summary: Use to get Network's Users by id
 *      parameters:
 *      - name: id
 *        description: id of the Network
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Networks
*/
app.get('/networks/:id/users', function (req, res) {
    getNetworkInfos('getNetworkUsers', req, res)
})

/**
 * @swagger
 * /networks/{id}/facilities:
 *  get:
 *      description: Use to get Network's Facilities by id
 *      summary: Use to get Network's Facilities by id
 *      parameters:
 *      - name: id
 *        description: id of the Network
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Networks
*/
app.get('/networks/:id/facilities', function (req, res) {
    getNetworkInfos('getNetworkFacilities', req, res)
})


/* Middleware: Must be system Administrator */
/* app.use(hasToBe('systemAdministrator')) */


/**
 * @swagger
 * /networks/{id}/delete:
 *  delete:
 *      description: Use to delete Network by id
 *      summary: Use to delete Network by id
 *      parameters:
 *      - name: id
 *        description: id of the network
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Networks
*/
app.delete('/networks/:id/delete', function (req, res) {
    activeOrDeleteNetwork('delete', req, res)
})


/**
 * @swagger
 * /networks/{id}/active:
 *  put:
 *      description: Use to active Network by id
 *      summary: Use to active Network by id
 *      parameters:
 *      - name: id
 *        description: id of the Network
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Networks
*/
app.put('/networks/:id/active', function (req, res) {
    activeOrDeleteNetwork('active', req, res)
})
/**
 * @swagger
 * /networks/:
 *  put:
 *      description: Use to edit Network
 *      summary: Use to edit Network.
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *            schema:
 *               type: object
 *               required:
 *                  - id
 *                  - accountNumber
 *                  - addressLine1
 *                  - addressLine2
 *                  - city
 *                  - contactName
 *                  - description
 *                  - emailAddress
 *                  - faxNumber
 *                  - mainPhoneNumber
 *                  - name
 *                  - postalCode
 *                  - state
 *               properties:
 *                  id:
 *                      type: string
 *                  accountNumber:
 *                      type: string
 *                  addressLine1:
 *                      type: string
 *                  addressLine2:
 *                      type: string
 *                  city:
 *                      type: string
 *                  contactName:
 *                      type: string
 *                  description:
 *                      type: string
 *                  emailAddress:
 *                      type: string
 *                  faxNumber:
 *                      type: string
 *                  postalCode:
 *                      type: string
 *                  state:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Networks
*/
app.put('/networks/', function (req, res) {
    hicardRequest.postRequest("medicalnetworks", req.body).then((result) => {
        if (result.data.errors.length == 0 && result.data.payload) {
            createOrEditNetwork('update', req, res)
        }else{
            res.send(Result.setSuccessResult(null))
        }
    }).catch((err) => {
        res.send(Result.setErrorResult("Something went wrong"))
    })
})

/**
 * @swagger
 * /networks/:
 *  post:
 *      description: Use to create Network
 *      summary: Use to create Network
 *      requestBody:
 *          required: true
 *          content:
 *           application/json:
 *            schema:
 *               type: object
 *               required:
 *                  - id
 *                  - accountNumber
 *                  - addressLine1
 *                  - addressLine2
 *                  - city
 *                  - contactName
 *                  - description
 *                  - emailAddress
 *                  - faxNumber
 *                  - mainPhoneNumber
 *                  - name
 *                  - postalCode
 *                  - state
 *               properties:
 *                  id:
 *                      type: string
 *                  accountNumber:
 *                      type: string
 *                  addressLine1:
 *                      type: string
 *                  addressLine2:
 *                      type: string
 *                  city:
 *                      type: string
 *                  contactName:
 *                      type: string
 *                  description:
 *                      type: string
 *                  emailAddress:
 *                      type: string
 *                  faxNumber:
 *                      type: string
 *                  postalCode:
 *                      type: string
 *                  state:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Networks
*/
app.post('/networks/', function (req, res) {
    hicardRequest.putRequest("medicalnetworks", req.body).then((result) => {
        if (result.data.errors.length == 0 && result.data.payload) {
            req.body.id = result.data.payload
            createOrEditNetwork('create', req, res)
        }else{
            res.send(Result.setSuccessResult(null))
        }
    }).catch((err) => {
        res.send(Result.setErrorResult("Something went wrong"))
    })
})

module.exports = app