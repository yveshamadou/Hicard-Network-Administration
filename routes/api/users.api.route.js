const express = require('express')
const User = require('../../models/user.model')
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

const getUser = function (id, req, res) {
    User.getUser(id, IP_address, function (response) {
        if (response.recordset.length > 0) {
            let datas = Result.setSuccessResult(response.recordset)
            res.send(datas)
        }else{
            res.send(Result.setErrorResult('User doesn\'t exist'))
        }
    })
}

const activeOrDeleteUser = function (action, req, res) {
    let id = req.params.id
    if (Helper.isGuid(id)) {
        User.activeOrDeleteUser(id, createdBy, IP_address, action, function (response) {
            if (response.rowsAffected[0] == 1) {
                res.send(Result.setSuccessResult(id))
            } else {
                res.send(Result.setErrorResult("user doesn't exist"))
            }
        })
    } else {
        res.send(Result.setErrorResult("UserID must be a GUID"))
    }
}

const createOrEditUser = function (action, req, res) {
    let UserID = req.body.UserID
    let UserName = req.body.UserName
    let FirstName = req.body.FirstName
    let LastName = req.body.LastName
    let RoleID = req.body.RoleID
    if (Helper.isGuid(UserID)) {
        User.createOrEditUser(UserID, UserName, FirstName, LastName, createdBy, IP_address, RoleID, action, function (response) {
            if (response.rowsAffected[0] == 1) {
                res.send(Result.setSuccessResult(response.recordset))
            } else {
                if (action == 'update') {
                    res.send(Result.setErrorResult("user doesn't exist"))
                } else {
                    res.send(Result.setErrorResult("Something went wrong"))
                }
            }
        })
    } else {
        res.send(Result.setErrorResult("UserID must be a GUID"))
    }
}

const UserToRole = function (action, req, res) {
    let UserID = req.body.UserID
    let RoleID = req.body.RoleID
    if (Helper.isGuid(UserID) && Helper.isGuid(RoleID)) {
        User.UserToRole(UserID, RoleID, createdBy, IP_address, action, function (response) {
            if (response.rowsAffected[0] == 1) {
                res.send(Result.setSuccessResult("success"))
            } else {
                res.send(Result.setErrorResult("This relation doesn't exist"))
            }
        })
    } else {
        let errorDescription = ""
        Helper.isGuid(UserID) ? null : errorDescription += "{UserID must be a GUID} "
        Helper.isGuid(RoleID) ? null : errorDescription += "{RoleID must be a GUID} "
        res.send(Result.setErrorResult(errorDescription))
    }
}
const UserToFacility = function (action, req, res) {
    let UserID = req.body.UserID
    let FacilityID = req.body.FacilityID
    if (Helper.isGuid(UserID) && Helper.isGuid(FacilityID)) {
        User.UserToFacility(UserID, FacilityID, createdBy, IP_address, action, function (response) {
            if (response.rowsAffected[0] == 1) {
                res.send(Result.setSuccessResult("success"))
            } else {
                res.send(Result.setErrorResult("This relation doesn't exist"))
            }
        })
    } else {
        let errorDescription = ""
        Helper.isGuid(UserID) ? null : errorDescription += "{UserID must be a GUID} "
        Helper.isGuid(FacilityID) ? null : errorDescription += "{FacilityID must be a GUID} "
        res.send(Result.setErrorResult(errorDescription))
    }
}
const UserToNetwork = function (action, req, res) {
    let UserID = req.body.UserID
    let NetworkID = req.body.NetworkID
    if (Helper.isGuid(UserID) && Helper.isGuid(NetworkID)) {
        User.UserToNetwork(UserID, NetworkID, createdBy, IP_address, action, function (response) {
            if (response.rowsAffected[0] == 1) {
                res.send(Result.setSuccessResult("success"))
            } else {
                res.send(Result.setErrorResult("This relation doesn't exist"))
            }
        })
    } else {
        let errorDescription = ""
        Helper.isGuid(UserID) ? null : errorDescription += "{UserID must be a GUID} "
        Helper.isGuid(NetworkID) ? null : errorDescription += "{NetworkID must be a GUID} "
        res.send(Result.setErrorResult(errorDescription))
    }
}

/**
 * @swagger
 * /users/{id}:
 *  get:
 *      description: Use to get user by id
 *      summary: Use to get user by id
 *      parameters:
 *      - name: id
 *        description: id of the user
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Users
*/
app.get('/users/:id', function (req, res) {
    let id = req.params.id
    if (Helper.isGuid(id)) {
        getUser(id, req, res)
    } else {
        res.send(Result.setErrorResult("UserID must be a GUID"))
    }
})

/**
 * @swagger
 * /users/{id}/delete:
 *  delete:
 *      description: Use to delete user by id
 *      summary: Use to delete user by id
 *      parameters:
 *      - name: id
 *        description: id of the user
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Users
*/
app.delete('/users/:id/delete', function (req, res) {
    activeOrDeleteUser('delete', req, res)
})


/**
 * @swagger
 * /users/{id}/active:
 *  put:
 *      description: Use to active user by id
 *      summary: Use to active user by id
 *      parameters:
 *      - name: id
 *        description: id of the user
 *        in: path
 *        required: true
 *        type: String
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Users
*/
app.put('/users/:id/active', function (req, res) {
    activeOrDeleteUser('active', req, res)
})
/**
 * @swagger
 * /users/:
 *  put:
 *      description: Use to edit user
 *      summary: Use to edit user
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - UserID
 *                  - UserName
 *                  - FirstName
 *                  - LastName
 *                  - RoleID
 *               properties:
 *                  UserID:
 *                      type: string
 *                  UserName:
 *                      type: string
 *                  FirstName:
 *                      type: string
 *                  LastName:
 *                      type: string
 *                  RoleID:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Users
*/
app.put('/users/', function (req, res) {
    createOrEditUser('update', req, res)
})

/**
 * @swagger
 * /users/:
 *  post:
 *      description: Use to create user
 *      summary: Use to create user
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - UserID
 *                  - UserName
 *                  - FirstName
 *                  - LastName
 *                  - RoleID
 *               properties:
 *                  UserID:
 *                      type: string
 *                  UserName:
 *                      type: string
 *                  FirstName:
 *                      type: string
 *                  LastName:
 *                      type: string
 *                  RoleID:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - Users
*/
app.post('/users/', function (req, res) {
    createOrEditUser('create', req, res)
})




/**
 * @swagger
 * /users/role/:
 *  delete:
 *      description: Use to delete user's role
 *      summary: Use to delete user's role
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - UserID
 *                  - RoleID
 *               properties:
 *                  UserID:
 *                      type: string
 *                  RoleID:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - User's Role
*/
app.delete('/users/role/', function (req, res) {
    UserToRole('delete', req, res)
})
/**
 * @swagger
 * /users/role/:
 *  post:
 *      description: Use to set a role to user
 *      summary: Use to set a role to user
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - UserID
 *                  - RoleID
 *               properties:
 *                  UserID:
 *                      type: string
 *                  RoleID:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - User's Role
*/
app.post('/users/role/', function (req, res) {
    UserToRole('create', req, res)
})
/**
 * @swagger
 * /users/role/activate:
 *  put:
 *      description: Use to active user's role
 *      summary: Use to active user's role
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - UserID
 *                  - RoleID
 *               properties:
 *                  UserID:
 *                      type: string
 *                  RoleID:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - User's Role
*/
app.put('/users/role/activate', function (req, res) {
    UserToRole('active', req, res)
})



/**
 * @swagger
 * /users/facility/:
 *  delete:
 *      description: Use to remove user to Facility
 *      summary: Use to remove user to Facility
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - UserID
 *                  - FacilityID
 *               properties:
 *                  UserID:
 *                      type: string
 *                  FacilityID:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - User's Facility
*/
app.delete('/users/facility/', function (req, res) {
    UserToFacility('delete', req, res)
})
/**
 * @swagger
 * /users/facility/:
 *  post:
 *      description: Use to join user to a facility
 *      summary: Use to join user to a facility
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - UserID
 *                  - FacilityID
 *               properties:
 *                  UserID:
 *                      type: string
 *                  FacilityID:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - User's Facility
*/
app.post('/users/facility/', function (req, res) {
    UserToFacility('create', req, res)
})
/**
 * @swagger
 * /users/facility/activate:
 *  put:
 *      description: Use to join again user to a facility
 *      summary: Use to join again user to a facility
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - UserID
 *                  - FacilityID
 *               properties:
 *                  UserID:
 *                      type: string
 *                  FacilityID:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - User's Facility
*/
app.put('/users/facility/activate', function (req, res) {
    UserToFacility('active', req, res)
})



/**
 * @swagger
 * /users/network/:
 *  delete:
 *      description: Use to remove user to a Network
 *      summary: Use to remove user to a Network
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - UserID
 *                  - NetworkID
 *               properties:
 *                  UserID:
 *                      type: string
 *                  NetworkID:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - User's Network
*/
app.delete('/users/network/', function (req, res) {
    UserToNetwork('delete', req, res)
})
/**
 * @swagger
 * /users/network/:
 *  post:
 *      description: Use to join user to a Network
 *      summary: Use to join user to a Network
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - UserID
 *                  - NetworkID
 *               properties:
 *                  UserID:
 *                      type: string
 *                  NetworkID:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - User's Network
*/
app.post('/users/network/', function (req, res) {
    UserToNetwork('create', req, res)
})
/**
 * @swagger
 * /users/network/activate:
 *  put:
 *      description: Use to join again user to a Network
 *      summary: Use to join again user to a Network
 *      requestBody:
 *          required: true
 *          content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *               type: object
 *               required:
 *                  - UserID
 *                  - NetworkID
 *               properties:
 *                  UserID:
 *                      type: string
 *                  NetworkID:
 *                      type: string
 *      responses:
 *          '200':
 *              description: A successfull response
 *      tags:
 *          - User's Network
*/
app.put('/users/network/activate', function (req, res) {
    UserToNetwork('active', req, res)
})

module.exports = app