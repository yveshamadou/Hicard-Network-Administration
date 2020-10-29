const sql = require('mssql')
const database = require('../config/database.config')

const sp = database.storedProcedures
class Provider {
    static createOrEditProvider(ProviderID, FirstName, LastName, TIN, NPI, createdBy, IP_address, action, response) {
        let conn = new sql.ConnectionPool(database.dbConfig)
        let req = new sql.Request(conn)
        conn.connect(function (err) {
            if (err) {
                throw err
            }
            req.input('ProviderID', sql.VarChar(50), ProviderID)
            req.input('FirstName', sql.VarChar(50), FirstName)
            req.input('LastName', sql.VarChar(50), LastName)
            req.input('TIN', sql.VarChar(50), TIN)
            req.input('NPI', sql.VarChar(50), NPI)
            req.input('createdBy', sql.VarChar(50), createdBy)
            req.input('IP_address', sql.VarChar(50), IP_address)
            req.input('action', sql.VarChar(50), action)
            req.execute(sp.createProvider, (err, recordsets) => {
                if (err) {
                    throw err
                } else {
                    response(recordsets)
                }
                conn.close()
            })
        })
    }
    static activeOrDeleteProvider(ProviderID, createdBy, IP_address, action = 'active', response) {
        let conn = new sql.ConnectionPool(database.dbConfig)
        let req = new sql.Request(conn)
        conn.connect(function (err) {
            if (err) {
                throw err
            }
            req.input('ProviderID', sql.VarChar(50), ProviderID)
            req.input('createdBy', sql.VarChar(50), createdBy)
            req.input('IP_address', sql.VarChar(50), IP_address)
            req.input('action', sql.VarChar(50), action)
            req.execute(sp.ProviderOperations, (err, recordsets) => {
                if (err) {
                    throw err
                } else {
                    response(recordsets)
                }
                conn.close()
            })
        })
    }
    static getProviderInfos(ProviderID, IP_address, action, response) {
        let conn = new sql.ConnectionPool(database.dbConfig)
        let req = new sql.Request(conn)
        conn.connect(function (err) {
            if (err) {
                throw err
            }
            req.input('ProviderID', sql.VarChar(50), ProviderID)
            req.input('IP_address', sql.VarChar(50), IP_address)
            req.input('action', sql.VarChar(50), action)
            req.execute(sp.ProviderOperations, (err, recordsets) => {
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

module.exports = Provider