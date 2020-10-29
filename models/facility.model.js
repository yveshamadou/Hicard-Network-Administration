const sql = require('mssql')
const database = require('../config/database.config')

const sp = database.storedProcedures
class Facility {
    static createOrEditFacility(FacilityID, Name, TIN, createdBy, IP_address, action, response) {
        let conn = new sql.ConnectionPool(database.dbConfig)
        let req = new sql.Request(conn)
        conn.connect(function (err) {
            if (err) {
                throw err
            }
            req.input('FacilityID', sql.VarChar(50), FacilityID)
            req.input('Name', sql.VarChar(50), Name)
            req.input('TIN', sql.VarChar(50), TIN)
            req.input('createdBy', sql.VarChar(50), createdBy)
            req.input('IP_address', sql.VarChar(50), IP_address)
            req.input('action', sql.VarChar(50), action)
            req.execute(sp.createFacility, (err, recordsets) => {
                if (err) {
                    throw err
                } else {
                    response(recordsets)
                }
                conn.close()
            })
        })
    }
    static activeOrDeleteFacility(FacilityID, createdBy, IP_address, action = 'active', response) {
        let conn = new sql.ConnectionPool(database.dbConfig)
        let req = new sql.Request(conn)
        conn.connect(function (err) {
            if (err) {
                throw err
            }
            req.input('FacilityID', sql.VarChar(50), FacilityID)
            req.input('createdBy', sql.VarChar(50), createdBy)
            req.input('IP_address', sql.VarChar(50), IP_address)
            req.input('action', sql.VarChar(50), action)
            req.execute(sp.FacilityOperations, (err, recordsets) => {
                if (err) {
                    throw err
                } else {
                    response(recordsets)
                }
                conn.close()
            })
        })
    }
    static getFacilityInfos(FacilityID, IP_address, action, response) {
        let conn = new sql.ConnectionPool(database.dbConfig)
        let req = new sql.Request(conn)
        conn.connect(function (err) {
            if (err) {
                throw err
            }
            req.input('FacilityID', sql.VarChar(50), FacilityID)
            req.input('IP_address', sql.VarChar(50), IP_address)
            req.input('action', sql.VarChar(50), action)
            req.execute(sp.FacilityOperations, (err, recordsets) => {
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

module.exports = Facility