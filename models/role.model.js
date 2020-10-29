const sql = require('mssql')
const database = require('../config/database.config')

const sp = database.storedProcedures
class Role {
    static insertOrEditRole(RoleID, Name, Description, createdBy, IP_address, action, response) {
        let conn = new sql.ConnectionPool(database.dbConfig)
        let req = new sql.Request(conn)
        conn.connect(function (err) {
            if (err) {
                throw err
            }
            req.input('RoleID', sql.VarChar(50), RoleID)
            req.input('Name', sql.VarChar(100), Name)
            req.input('Description', sql.VarChar(1000), Description)
            req.input('createdBy', sql.VarChar(50), createdBy)
            req.input('IP_address', sql.VarChar(50), IP_address)
            req.input('action', sql.VarChar(50), action)
            req.execute(sp.createRole, (err, recordsets) => {
                if (err) {
                    throw err
                } else {
                    response(recordsets)
                }
                conn.close()
            })
        })
    }
    static activeOrDeleteRole(RoleID, createdBy, IP_address, action = 'active', response) {
        let conn = new sql.ConnectionPool(database.dbConfig)
        let req = new sql.Request(conn)
        conn.connect(function (err) {
            if (err) {
                throw err
            }
            req.input('RoleID', sql.VarChar(50), RoleID)
            req.input('createdBy', sql.VarChar(50), createdBy)
            req.input('IP_address', sql.VarChar(50), IP_address)
            req.input('action', sql.VarChar(50), action)
            req.execute(sp.RoleOperations, (err, recordsets) => {
                if (err) {
                    throw err
                } else {
                    response(recordsets)
                }
                conn.close()
            })
        })
    }
    static getRoleS(RoleID = null, response) {
        let conn = new sql.ConnectionPool(database.dbConfig)
        let req = new sql.Request(conn)
        conn.connect(function (err) {
            if (err) {
                throw err
            }
            req.input('RoleID', sql.VarChar(50), RoleID)
            req.input('action', sql.VarChar(50), RoleID ? 'getRole' : 'getAllRoles')
            req.execute(sp.RoleOperations, (err, recordsets) => {
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

module.exports = Role