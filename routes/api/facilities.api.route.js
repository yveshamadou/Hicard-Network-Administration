const express = require('express')
const Facility = require('../../models/facility.model')
const Result = require('../../models/result.model')
const Helper = require('./api-helper')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

let IP_address
app.use((req, res, next) => {
    IP_address = req.connection.remoteAddress
    next()
})
const createdBy = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'

const getFacilityInfos = function (action, req, res) {
    let id = req.params.id
    if (Helper.isGuid(id)) {
        Facility.getFacilityInfos(id, IP_address, action, function (response) {
            if (response.recordset.length > 0) {
                let datas = Result.setSuccessResult(response.recordset)
                res.send(datas)
            }else{
                res.send(Result.setSuccessResult(null))
            }
        })
    } else {
        res.send(Result.setErrorResult("FacilityID must be a GUID"))
    }
}
const activeOrDeleteFacility = function (action, req, res) {
    let id = req.params.id
    if (Helper.isGuid(id)) {
        Facility.activeOrDeleteFacility(id, createdBy, IP_address, action, function (response) {
            if (response.rowsAffected[0] == 1) {
                res.send(Result.setSuccessResult(id))
            } else {
                res.send(Result.setErrorResult("Facility doesn't exist"))
            }
        })
    } else {
        res.send(Result.setErrorResult("FacilityID must be a GUID"))
    }
}
const createOrEditFacility = function (action, req, res) {
    let FacilityID = req.body.FacilityID
    let Name = req.body.Name
    let TIN = req.body.TIN
    if (Helper.isGuid(FacilityID)) {
        Facility.createOrEditFacility(FacilityID, Name, TIN, createdBy, IP_address, action, function (response) {
            if (response.rowsAffected[0] == 1) {
                res.send(Result.setSuccessResult(response.recordset))
            } else {
                if (action == 'update') {
                    res.send(Result.setErrorResult("Facility doesn't exist"))
                } else {
                    res.send(Result.setErrorResult("Something went wrong"))
                }
            }
        })
    } else {
        res.send(Result.setErrorResult("FacilityID must be a GUID"))
    }
}



const FacilityToNetwork = function (action, req, res) {
    let FacilityID = req.body.FacilityID
    let NetworkID = req.body.NetworkID
    if (Helper.isGuid(FacilityID) && Helper.isGuid(NetworkID)) {
        Facility.FacilityToNetwork(FacilityID, NetworkID, createdBy, IP_address, action, function (response) {
            if (response.rowsAffected[0] == 1) {
                res.send(Result.setSuccessResult("success"))
            } else {
                res.send(Result.setErrorResult("This relation doesn't exist"))
            }
        })
    } else {
        let errorDescription = ""
        Helper.isGuid(FacilityID) ? null : errorDescription += "{FacilityID must be a GUID} "
        Helper.isGuid(NetworkID) ? null : errorDescription += "{NetworkID must be a GUID} "
        res.send(Result.setErrorResult(errorDescription))
    }
}

/**
 * @swagger
 * /facilities/{id}:
 *  get:
 *      description: Use to get Facility by id
 *      summary: Use to get Facility by id
 *      parameters:
 *      - name: id
 *        description: id of the Facility
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Facilities
*/
app.get('/facilities/:id', function (req, res) {
    getFacilityInfos('getFacility', req, res)
})

/**
 * @swagger
 * /facilities/{id}/providers:
 *  get:
 *      description: Use to get Facility's Providers by id
 *      summary: Use to get Facility's Providers by id
 *      parameters:
 *      - name: id
 *        description: id of the Facility
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Facilities
*/
app.get('/facilities/:id/providers', function (req, res) {
    getFacilityInfos('getFacilityProviders', req, res)
})

/**
 * @swagger
 * /facilities/{id}/users:
 *  get:
 *      description: Use to get Facility's Users by id
 *      summary: Use to get Facility's Users by id
 *      parameters:
 *      - name: id
 *        description: id of the Facility
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Facilities
*/
app.get('/facilities/:id/users', function (req, res) {
    getFacilityInfos('getFacilityUsers', req, res)
})

/**
 * @swagger
 * /facilities/{id}/networks:
 *  get:
 *      description: Use to get Facility's Networks by id
 *      summary: Use to get Facility's networks by id
 *      parameters:
 *      - name: id
 *        description: id of the Facility
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Facilities
*/
app.get('/facilities/:id/networks', function (req, res) {
    getFacilityInfos('getFacilityNetwork', req, res)
})

/**
 * @swagger
 * /facilities/{id}/delete:
 *  delete:
 *      description: Use to delete Facility by id
 *      summary: Use to delete Facility by id
 *      parameters:
 *      - name: id
 *        description: id of the Facility
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Facilities
*/
app.delete('/facilities/:id/delete', function (req, res) {
    activeOrDeleteFacility('delete', req, res)
})


/**
 * @swagger
 * /facilities/{id}/active:
 *  put:
 *      description: Use to active Facility by id
 *      summary: Use to active Facility by id
 *      parameters:
 *      - name: id
 *        description: id of the Facility
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Facilities
*/
app.put('/facilities/:id/active', function (req, res) {
    activeOrDeleteFacility('active', req, res)
})
/**
 * @swagger
 * /facilities/:
 *  put:
 *      description: Use to edit Facility
 *      summary: Use to edit Facility.
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - FacilityID
 *                  - Name
 *                  - TIN
 *               properties:
 *                  FacilityID:
 *                      type: string
 *                  Name:
 *                      type: string
 *                  TIN:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Facilities
*/
app.put('/facilities/', function (req, res) {
    createOrEditFacility('update', req, res)
})

/**
 * @swagger
 * /facilities/:
 *  post:
 *      description: Use to create Facility
 *      summary: Use to create Facility
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - FacilityID
 *                  - Name
 *                  - TIN
 *               properties:
 *                  FacilityID:
 *                      type: string
 *                  Name:
 *                      type: string
 *                  TIN:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Facilities
*/
app.post('/facilities/', function (req, res) {
    createOrEditFacility('create', req, res)
})







/**
 * @swagger
 * /facilities/network/:
 *  delete:
 *      description: Use to remove Facility to a Network
 *      summary: Use to remove Facility to a Network
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - FacilityID
 *                  - NetworkID
 *               properties:
 *                  FacilityID:
 *                      type: string
 *                  NetworkID:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Facility's Network
*/
app.delete('/facilities/network/', function (req, res) {
    FacilityToNetwork('delete', req, res)
})
/**
 * @swagger
 * /facilities/network/:
 *  post:
 *      description: Use to join Facility to a Network
 *      summary: Use to join Facility to a Network
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - FacilityID
 *                  - NetworkID
 *               properties:
 *                  FacilityID:
 *                      type: string
 *                  NetworkID:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Facility's Network
*/
app.post('/facilities/network/', function (req, res) {
    FacilityToNetwork('create', req, res)
})
/**
 * @swagger
 * /facilities/network/activate:
 *  put: 
 *      description: Use to join again Facility to a Network
 *      summary: Use to join again Facility to a Network
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - FacilityID
 *                  - NetworkID
 *               properties:
 *                  FacilityID:
 *                      type: string
 *                  NetworkID:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Facility's Network
*/
app.put('/facilities/network/activate', function (req, res) {
    FacilityToNetwork('active', req, res)
})


module.exports = app