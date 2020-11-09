let config = require('../config/global.config')
class Cookies {
    constructor() {
        this.expires = config.cookies.expires;
        this.httpOnly = false;
        this.secure = false;
        this.signed = true;
        this.overwrite = true
    }

    setCookieAppToken(res, value, expires = null) {
        res.cookie('appToken', value, { expires: expires, httpOnly: this.httpOnly, overwrite: this.overwrite, encode: String });
        return res;
    }

    setCookieSecurityToken(res, value, expires = null) {
        res.cookie('securityToken', value, { expires: expires, httpOnly: this.httpOnly, overwrite: this.overwrite, encode: String });
        return res;
    }

    setCookieUserToken(res, value, expires = null) {
        res.cookie('memberGuid', value, { expires: expires, httpOnly: this.httpOnly, overwrite: this.overwrite, encode: String });
        return res;
    }

    setCookie(res, name, value, expires = null) {
        res.cookie(name, value, { expires: expires, httpOnly: this.httpOnly, encode: String });
        return res;
    }

    parseCookies(req) {
        var list = {},
            rc = req.headers.cookie;

        rc && rc.split(';').forEach(function (cookie) {
            var parts = cookie.split('=');
            list[parts.shift().trim()] = decodeURI(parts.join('='));
        });

        return list;
    }

    deleteCookie(res, name) {
        res.clearCookie(name);
        return res;
    }

    deleteAllCookies(res) {
        res.clearCookie('appToken');
        res.clearCookie('securityToken');
        return res;
    }

    deleteSecurityTokenCookies(res) {
        res.clearCookie('securityToken');
        return res;
    }

    deleteAppTokenCookies(res) {
        res.clearCookie('appToken');
        return res;
    }
}

module.exports = Cookies