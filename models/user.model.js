const sql = require('mssql')
const database = require('../config/database.config')

const sp = database.storedProcedures
class User {
    static createOrEditUser(UserID, UserName, FirstName, LastName, createdBy, IP_address, RoleID, action, response) {
        let conn = new sql.ConnectionPool(database.dbConfig)
        let req = new sql.Request(conn)
        conn.connect(function (err) {
            if (err) {
                throw err
            }
            req.input('UserID', sql.VarChar(50), UserID)
            req.input('UserName', sql.VarChar(50), UserName)
            req.input('FirstName', sql.VarChar(50), FirstName)
            req.input('LastName', sql.VarChar(50), LastName)
            req.input('createdBy', sql.VarChar(50), createdBy)
            req.input('IP_address', sql.VarChar(50), IP_address)
            req.input('RoleID', sql.VarChar(50), RoleID)
            req.input('action', sql.VarChar(50), action)
            req.execute(sp.createUser, (err, recordsets) => {
                if (err) {
                    throw err
                } else {
                    response(recordsets)
                }
                conn.close()
            })
        })
    }
    static activeOrDeleteUser(UserID, createdBy, IP_address, action = 'active', response) {
        let conn = new sql.ConnectionPool(database.dbConfig)
        let req = new sql.Request(conn)
        conn.connect(function (err) {
            if (err) {
                throw err
            }
            req.input('UserID', sql.VarChar(50), UserID)
            req.input('createdBy', sql.VarChar(50), createdBy)
            req.input('IP_address', sql.VarChar(50), IP_address)
            req.input('action', sql.VarChar(50), action)
            req.execute(sp.UserOperations, (err, recordsets) => {
                if (err) {
                    throw err
                } else {
                    response(recordsets)
                }
                conn.close()
            })
        })
    }
    static getUser(UserID, IP_address, response) {
        let conn = new sql.ConnectionPool(database.dbConfig)
        let req = new sql.Request(conn)
        conn.connect(function (err) {
            if (err) {
                throw err
            }
            req.input('UserID', sql.VarChar(50), UserID)
            req.input('IP_address', sql.VarChar(50), IP_address)
            req.input('action', sql.VarChar(50), 'getUser')
            req.execute(sp.UserOperations, (err, recordsets) => {
                if (err) {
                    throw err
                } else {
                    response(recordsets)
                }
                conn.close()
            })
        })
    }

    
    static UserToRole(UserID, RoleID, createdBy, IP_address, action = 'active', response) {
        let conn = new sql.ConnectionPool(database.dbConfig)
        let req = new sql.Request(conn)
        conn.connect(function (err) {
            if (err) {
                throw err
            }
            req.input('UserID', sql.VarChar(50), UserID)
            req.input('RoleID', sql.VarChar(50), RoleID)
            req.input('createdBy', sql.VarChar(50), createdBy)
            req.input('IP_address', sql.VarChar(50), IP_address)
            req.input('action', sql.VarChar(50), action)
            req.execute(sp.createUserRole, (err, recordsets) => {
                if (err) {
                    throw err
                } else {
                    response(recordsets)
                }
                conn.close()
            })
        })
    }
    static UserToFacility(UserID, FacilityID, createdBy, IP_address, action = 'active', response) {
        let conn = new sql.ConnectionPool(database.dbConfig)
        let req = new sql.Request(conn)
        conn.connect(function (err) {
            if (err) {
                throw err
            }
            req.input('UserID', sql.VarChar(50), UserID)
            req.input('FacilityID', sql.VarChar(50), FacilityID)
            req.input('createdBy', sql.VarChar(50), createdBy)
            req.input('IP_address', sql.VarChar(50), IP_address)
            req.input('action', sql.VarChar(50), action)
            req.execute(sp.createUserFacility, (err, recordsets) => {
                if (err) {
                    throw err
                } else {
                    response(recordsets)
                }
                conn.close()
            })
        })
    }
    static UserToNetwork(UserID, NetworkID, createdBy, IP_address, action = 'active', response) {
        let conn = new sql.ConnectionPool(database.dbConfig)
        let req = new sql.Request(conn)
        conn.connect(function (err) {
            if (err) {
                throw err
            }
            req.input('UserID', sql.VarChar(50), UserID)
            req.input('NetworkID', sql.VarChar(50), NetworkID)
            req.input('createdBy', sql.VarChar(50), createdBy)
            req.input('IP_address', sql.VarChar(50), IP_address)
            req.input('action', sql.VarChar(50), action)
            req.execute(sp.createUserNetwork, (err, recordsets) => {
                if (err) {
                    throw err
                } else {
                    response(recordsets)
                }
                conn.close()
            })
        })
    }
}

module.exports = User