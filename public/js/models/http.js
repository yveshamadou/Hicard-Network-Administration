export function setToken(token) {
    var http2 = window.fetch;
    fetch = function (url, options) {
        options.headers['Authorization'] = 'Bearer '+ token;
        options.headers['Accept'] = 'application/json';
        return http2(url, options)
    }
}