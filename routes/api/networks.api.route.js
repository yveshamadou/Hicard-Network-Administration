const express = require('express')
const Network = require('../../models/network.model')
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

const getNetworkInfos = function (action, req, res) {
    let id = req.params.id
    if (Helper.isGuid(id)) {
        Network.getNetworkInfos(id, IP_address, action, function (response) {
            if (response.recordset.length > 0) {
                let datas = Result.setSuccessResult(response.recordset)
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
    let NetworkID = req.body.NetworkID
    let Name = req.body.Name
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
    getNetworkInfos('getNetwork', req, res)
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
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - NetworkID
 *                  - Name
 *               properties:
 *                  NetworkID:
 *                      type: string
 *                      description: NetworkID of the Network
 *                  Name:
 *                      type: string
 *                      description: Name of the Network
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Networks
*/
app.put('/networks/', function (req, res) {
    createOrEditNetwork('update', req, res)
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
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - NetworkID
 *                  - Name
 *               properties:
 *                  NetworkID:
 *                      type: string
 *                      description: NetworkID of the Network
 *                  Name:
 *                      type: string
 *                      description: Name of the Network
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Networks
*/
app.post('/networks/', function (req, res) {
    createOrEditNetwork('create', req, res)
})

module.exports = app