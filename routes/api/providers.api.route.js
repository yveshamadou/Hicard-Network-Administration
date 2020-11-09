const express = require('express')
const Provider = require('../../models/provider.model')
const Result = require('../../models/result.model')
const Helper = require('./api-helper')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt_decode = require('jwt-decode')
const _Cookies = require('../../models/cookies.model')
const hasToBe = require('../../middlewares/checkRole.mdlw')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())


/* Middleware: Must be Facility Administrator */
app.use(hasToBe('facilityAdministrator'))
const _cookies = new _Cookies()

let IP_address, createdBy
app.use((req, res, next) => {
    IP_address = req.connection.remoteAddress
    createdBy = jwt_decode(_cookies.parseCookies(req).x_datas).UserID
    next()
})

const getProviderInfos = function (action, req, res) {
    let id = req.params.id
    if (Helper.isGuid(id)) {
        Provider.getProviderInfos(id, IP_address, action, function (response) {
            if (response.recordset.length > 0) {
                let datas = Result.setSuccessResult(response.recordset)
                res.send(datas)
            }else{
                res.send(Result.setSuccessResult(null))
            }
        })
    } else {
        res.send(Result.setErrorResult("ProviderID must be a GUID"))
    }
}
const activeOrDeleteProvider = function (action, req, res) {
    let id = req.params.id
    if (Helper.isGuid(id)) {
        Provider.activeOrDeleteProvider(id, createdBy, IP_address, action, function (response) {
            if (response.rowsAffected[0] == 1) {
                res.send(Result.setSuccessResult(id))
            } else {
                res.send(Result.setErrorResult("Provider doesn't exist"))
            }
        })
    } else {
        res.send(Result.setErrorResult("ProviderID must be a GUID"))
    }
}
const createOrEditProvider = function (action, req, res) {
    let ProviderID = req.body.ProviderID
    let FirstName = req.body.FirstName
    let LastName = req.body.LastName
    let TIN = req.body.TIN
    let NPI = req.body.NPI
    if (Helper.isGuid(ProviderID)) {
        Provider.createOrEditProvider(ProviderID, FirstName, LastName, TIN, NPI, createdBy, IP_address, action, function (response) {
            if (response.rowsAffected[0] == 1) {
                res.send(Result.setSuccessResult(response.recordset))
            } else {
                if (action == 'update') {
                    res.send(Result.setErrorResult("Provider doesn't exist"))
                } else {
                    res.send(Result.setErrorResult("Something went wrong"))
                }
            }
        })
    } else {
        res.send(Result.setErrorResult("ProviderID must be a GUID"))
    }
}


const ProviderToFacility = function (action, req, res) {
    let ProviderID = req.body.ProviderID
    let FacilityID = req.body.FacilityID
    if (Helper.isGuid(ProviderID) && Helper.isGuid(FacilityID)) {
        Provider.ProviderToFacility(ProviderID, FacilityID, createdBy, IP_address, action, function (response) {
            if (response.rowsAffected[0] == 1) {
                res.send(Result.setSuccessResult("success"))
            } else {
                res.send(Result.setErrorResult("This relation doesn't exist"))
            }
        })
    } else {
        let errorDescription = ""
        Helper.isGuid(ProviderID) ? null : errorDescription += "{ProviderID must be a GUID} "
        Helper.isGuid(FacilityID) ? null : errorDescription += "{FacilityID must be a GUID} "
        res.send(Result.setErrorResult(errorDescription))
    }
}
const ProviderToNetwork = function (action, req, res) {
    let ProviderID = req.body.ProviderID
    let NetworkID = req.body.NetworkID
    if (Helper.isGuid(ProviderID) && Helper.isGuid(NetworkID)) {
        Provider.ProviderToNetwork(ProviderID, NetworkID, createdBy, IP_address, action, function (response) {
            if (response.rowsAffected[0] == 1) {
                res.send(Result.setSuccessResult("success"))
            } else {
                res.send(Result.setErrorResult("This relation doesn't exist"))
            }
        })
    } else {
        let errorDescription = ""
        Helper.isGuid(ProviderID) ? null : errorDescription += "{ProviderID must be a GUID} "
        Helper.isGuid(NetworkID) ? null : errorDescription += "{NetworkID must be a GUID} "
        res.send(Result.setErrorResult(errorDescription))
    }
}



/**
 * @swagger
 * /providers/{id}:
 *  get:
 *      description: Use to get Provider by id
 *      summary: Use to get Provider by id
 *      parameters:
 *      - name: id
 *        description: id of the Provider
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Providers
*/
app.get('/providers/:id', function (req, res) {
    getProviderInfos('getProvider', req, res)
})

/**
 * @swagger
 * /providers/{id}/facilities:
 *  get:
 *      description: Use to get Provider's Facilities by id
 *      summary: Use to get Provider's Facilities by id
 *      parameters:
 *      - name: id
 *        description: id of the Provider
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Providers
*/
app.get('/providers/:id/facilities', function (req, res) {
    getProviderInfos('getProviderFacility', req, res)
})

/**
 * @swagger
 * /providers/{id}/networks:
 *  get:
 *      description: Use to get Provider's Networks by id
 *      summary: Use to get Provider's networks by id
 *      parameters:
 *      - name: id
 *        description: id of the Provider
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Providers
*/
app.get('/providers/:id/networks', function (req, res) {
    getProviderInfos('getProviderNetwork', req, res)
})




/* Middleware: Must be Network Administrator */
app.use(hasToBe('networkAdministrator'))


/**
 * @swagger
 * /providers/{id}/delete:
 *  delete:
 *      description: Use to delete Provider by id
 *      summary: Use to delete Provider by id
 *      parameters:
 *      - name: id
 *        description: id of the Provider
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Providers
*/
app.delete('/providers/:id/delete', function (req, res) {
    activeOrDeleteProvider('delete', req, res)
})


/**
 * @swagger
 * /providers/{id}/active:
 *  put:
 *      description: Use to active Provider by id
 *      summary: Use to active Provider by id
 *      parameters:
 *      - name: id
 *        description: id of the Provider
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Providers
*/
app.put('/providers/:id/active', function (req, res) {
    activeOrDeleteProvider('active', req, res)
})
/**
 * @swagger
 * /providers/:
 *  put:
 *      description: Use to edit Provider
 *      summary: Use to edit Provider.
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - ProviderID
 *                  - FirstName
 *                  - LastName
 *                  - TIN
 *                  - NPI
 *               properties:
 *                  ProviderID:
 *                      type: string
 *                  FirstName:
 *                      type: string
 *                  LastName:
 *                      type: string
 *                  TIN:
 *                      type: string
 *                  NPI:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Providers
*/
app.put('/providers/', function (req, res) {
    createOrEditProvider('update', req, res)
})

/**
 * @swagger
 * /providers/:
 *  post:
 *      description: Use to create Provider
 *      summary: Use to edit Provider.
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - ProviderID
 *                  - FirstName
 *                  - LastName
 *                  - TIN
 *                  - NPI
 *               properties:
 *                  ProviderID:
 *                      type: string
 *                  FirstName:
 *                      type: string
 *                  LastName:
 *                      type: string
 *                  TIN:
 *                      type: string
 *                  NPI:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Providers
*/
app.post('/providers/', function (req, res) {
    createOrEditProvider('create', req, res)
})







/**
 * @swagger
 * /providers/network/:
 *  delete:
 *      description: Use to remove provider to a Network
 *      summary: Use to remove provider to a Network
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - ProviderID
 *                  - NetworkID
 *               properties:
 *                  ProviderID:
 *                      type: string
 *                  NetworkID:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Provider's Network
*/
app.delete('/providers/network/', function (req, res) {
    ProviderToNetwork('delete', req, res)
})
/**
 * @swagger
 * /providers/network/:
 *  post:
 *      description: Use to join provider to a Network
 *      summary: Use to join provider to a Network
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - ProviderID
 *                  - NetworkID
 *               properties:
 *                  ProviderID:
 *                      type: string
 *                  NetworkID:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Provider's Network
*/
app.post('/providers/network/', function (req, res) {
    ProviderToNetwork('create', req, res)
})
/**
 * @swagger
 * /providers/network/activate:
 *  put:
 *      description: Use to join again provider to a Network
 *      summary: Use to join again provider to a Network
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - ProviderID
 *                  - NetworkID
 *               properties:
 *                  ProviderID:
 *                      type: string
 *                  NetworkID:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Provider's Network
*/
app.put('/providers/network/activate', function (req, res) {
    ProviderToNetwork('active', req, res)
})

/**
 * @swagger
 * /providers/facility/:
 *  delete:
 *      description: Use to remove provider to a Facility
 *      summary: Use to remove provider to a Facility
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - ProviderID
 *                  - FacilityID
 *               properties:
 *                  ProviderID:
 *                      type: string
 *                  FacilityID:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Provider's Facility
*/
app.delete('/providers/facility/', function (req, res) {
    ProviderToFacility('delete', req, res)
})
/**
 * @swagger
 * /providers/facility/:
 *  post:
 *      description: Use to join provider to a Facility
 *      summary: Use to join provider to a Facility
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - ProviderID
 *                  - FacilityID
 *               properties:
 *                  ProviderID:
 *                      type: string
 *                  FacilityID:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Provider's Facility
*/
app.post('/providers/facility/', function (req, res) {
    ProviderToFacility('create', req, res)
})
/**
 * @swagger
 * /providers/facility/activate:
 *  put:
 *      description: Use to join again provider to a Facility
 *      summary: Use to join again provider to a Facility
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - ProviderID
 *                  - FacilityID
 *               properties:
 *                  ProviderID:
 *                      type: string
 *                  FacilityID:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Provider's Facility
*/
app.put('/providers/facility/activate', function (req, res) {
    ProviderToFacility('active', req, res)
})

module.exports = app