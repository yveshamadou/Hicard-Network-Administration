const express = require('express')
const Role = require('../../models/role.model')
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

const getRoles = function (id, req, res) {
    let pageNumber = req.params.pageNumber ? req.params.pageNumber : 0
    let pageSize = req.params.pageSize ? req.params.pageSize : 50
    Role.getRoleS(id, function (response) {
        if (response.recordset.length > 0) {
            let datas = Result.setSuccessResult(response.recordset)
            res.send(datas)
        }else{
            res.send(Result.setErrorResult('Something went wrong'))
        }
    })
}

const activeOrDeleteRole = function (action, req, res) {
    let id = req.params.id
    if (Helper.isGuid(id)) {
        Role.activeOrDeleteRole(id, createdBy, IP_address, action, function (response) {
            if (response.rowsAffected[0] == 1) {
                res.send(Result.setSuccessResult(id))
            } else {
                res.send(Result.setErrorResult("role not found"))
            }
        })
    } else {
        res.send(Result.setErrorResult("RoleID must be a GUID"))
    }
}

const insertOrEditRole = function (action, req, res) {
    let RoleID = req.body.RoleID
    let Name = req.body.Name
    let Description = req.body.Description
    if (Helper.isGuid(RoleID)) {
        Role.insertOrEditRole(RoleID, Name, Description, createdBy, IP_address, action, function (response) {
            if (response.rowsAffected[0] == 1) {
                res.send(Result.setSuccessResult(response.recordset))
            } else {
                if (action == 'update') {
                    res.send(Result.setErrorResult("role not found"))
                } else {
                    res.send(Result.setErrorResult("Something went wrong"))
                }
            }
        })
    } else {
        res.send(Result.setErrorResult("RoleID must be a GUID"))
    }
}

/**
 * @swagger
 * /roles:
 *  get:
 *      description: Use to get all roles
 *      summary: Use to get all roles
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Roles
*/
app.get('/roles', function (req, res) {
    getRoles(null, req, res)
})


/**
 * @swagger
 * /roles/{id}:
 *  get:
 *      description: Use to get a role by id
 *      summary: Use to get a role by id
 *      parameters:
 *      - name: id
 *        description: id of the role
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Roles
*/
app.get('/roles/:id', function (req, res) {
    let id = req.params.id
    if (Helper.isGuid(id)) {
        getRoles(id, req, res)
    } else {
        res.send(Result.setErrorResult("RoleID must be a GUID"))
    }
})

/**
 * @swagger
 * /roles/{id}/delete:
 *  delete:
 *      description: Use to delete a role by id
 *      summary: Use to delete a role by id
 *      parameters:
 *      - name: id
 *        description: id of the role
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Roles
*/
app.delete('/roles/:id/delete', function (req, res) {
    activeOrDeleteRole('delete', req, res)
})


/**
 * @swagger
 * /roles/{id}/active:
 *  put:
 *      description: Use to active a role by id
 *      summary: Use to active a role by id
 *      parameters:
 *      - name: id
 *        description: id of the role
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Roles
*/
app.put('/roles/:id/active', function (req, res) {
    activeOrDeleteRole('active', req, res)
})
/**
 * @swagger
 * /roles/:
 *  put:
 *      description: Use to edit role
 *      summary: Use to edit role
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - RoleID
 *                  - Name
 *                  - Description
 *               properties:
 *                  RoleID:
 *                      type: string
 *                  Name:
 *                      type: string
 *                  Description:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Roles
*/
app.put('/roles/', function (req, res) {
    insertOrEditRole('update', req, res)
})
/**
 * @swagger
 * /roles/:
 *  post:
 *      description: Use to create role
 *      summary: Use to create role
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - RoleID
 *                  - Name
 *                  - Description
 *               properties:
 *                  RoleID:
 *                      type: string
 *                  Name:
 *                      type: string
 *                  Description:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Roles
*/
app.post('/roles/', function (req, res) {
    insertOrEditRole('create', req, res)
})

module.exports = app