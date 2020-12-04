import {utils} from '../helpers/utils.js'
let helper = new utils()

export function setToken(token) {
    var http2 = window.fetch;
    var securityToken = helper.parseJwt(token).activator_security_token
    fetch = function (url, options) {
        options.headers['Authorization'] = 'Bearer '+ token;
        options.headers['Accept'] = 'application/json';
        options.headers['securityToken'] = securityToken;
        return http2(url, options)
    }
}