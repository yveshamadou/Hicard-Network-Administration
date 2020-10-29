const sql = require('mssql')
const database = require('../config/database.config')

const sp = database.storedProcedures
class Network {
    static createOrEditNetwork(NetworkID, Name, createdBy, IP_address, action, response) {
        let conn = new sql.ConnectionPool(database.dbConfig)
        let req = new sql.Request(conn)
        conn.connect(function (err) {
            if (err) {
                throw err
            }
            req.input('NetworkID', sql.VarChar(50), NetworkID)
            req.input('Name', sql.VarChar(50), Name)
            req.input('createdBy', sql.VarChar(50), createdBy)
            req.input('IP_address', sql.VarChar(50), IP_address)
            req.input('action', sql.VarChar(50), action)
            req.execute(sp.createNetwork, (err, recordsets) => {
                if (err) {
                    throw err
                } else {
                    response(recordsets)
                }
                conn.close()
            })
        })
    }
    static activeOrDeleteNetwork(NetworkID, createdBy, IP_address, action = 'active', response) {
        let conn = new sql.ConnectionPool(database.dbConfig)
        let req = new sql.Request(conn)
        conn.connect(function (err) {
            if (err) {
                throw err
            }
            req.input('NetworkID', sql.VarChar(50), NetworkID)
            req.input('createdBy', sql.VarChar(50), createdBy)
            req.input('IP_address', sql.VarChar(50), IP_address)
            req.input('action', sql.VarChar(50), action)
            req.execute(sp.NetworkOperations, (err, recordsets) => {
                if (err) {
                    throw err
                } else {
                    response(recordsets)
                }
                conn.close()
            })
        })
    }
    static getNetworkInfos(NetworkID, IP_address, action, response) {
        let conn = new sql.ConnectionPool(database.dbConfig)
        let req = new sql.Request(conn)
        conn.connect(function (err) {
            if (err) {
                throw err
            }
            req.input('NetworkID', sql.VarChar(50), NetworkID)
            req.input('IP_address', sql.VarChar(50), IP_address)
            req.input('action', sql.VarChar(50), action)
            req.execute(sp.NetworkOperations, (err, recordsets) => {
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

module.exports = Network