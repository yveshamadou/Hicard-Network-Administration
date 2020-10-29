class Result {
    static setErrorResult(description = "An Error Occured") {
        let result = {
            "status": "error",
            "description": description,
            "datas": null
        }
        return result;
    }
    static setSuccessResult(datas, description = "The operation has been done successfully") {
        let result = {
            "status": "success",
            "description": description,
            "datas": datas
        }
        return result;
    }
}
module.exports = Result