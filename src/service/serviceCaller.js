
'use strict';
require('es6-promise').polyfill();
if (typeof self !== 'undefined') {
    //when its in the web.
    require('isomorphic-fetch');
}


var baseDomain = '';
var accessToken = '';
var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};
var connection,
    proxy,
    client = 'EN';
export const service = {
    setDomain: function (domain) {
        baseDomain = domain;
    },
    getClient: function () {
        return client;
    },
    setUserAccessToken: function (access_token) {
        accessToken = access_token;
        // service.r.connect();
    },
    getAccessToken: function () {
        return accessToken;
    },
    call: function (endpoint, method, body) {
        return fetch(endpoint, {
            headers: Object.assign({}, headers, {
                // 'Authorization': 'Bearer ' + service.getAccessToken()
            }),
            method: method,
            body: body == undefined ? null : JSON.stringify(body)
        }).then(function (response) {
            return response.json().then(function (json) {
                return json;
            })
        });
    },
    delete: function (path) {
        var endpoint = baseDomain + path;
        return service.call(endpoint, 'DELETE');
    },
    put: function (path, body) {
        var endpoint = baseDomain + path;
        return service.call(endpoint, 'PUT', body);
    },
    post: function (path, body) {
        var endpoint = baseDomain + path;
        return service.call(endpoint, 'POST', body);
    },
    get: function (path) {
        var endpoint = baseDomain + path;
        return service.call(endpoint, 'GET');
    }
}