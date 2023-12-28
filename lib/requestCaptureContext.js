// const superagent = require('superagent');
const request = require('request');
const crypto = require('crypto');
const getHttpSignature = require('./getHttpSignature');
const generateDigest = require('./generateDigest');
const captureContextData = require('../data/captureContextData');

const requestHost = process.env.CYBS_HOST;
const merchantId = process.env.CYBS_MID;
const merchantKeyId = process.env.CYBS_KEY_ID;
const merchantSecretKey = process.env.CYBS_SHARED_SECRET;

console.log("merchantId: " + merchantId);
console.log("merchantKeyId: " + merchantKeyId);
console.log("merchantSecretKey: " + merchantSecretKey);

// const payload = JSON.stringify(captureContextData);
                        
// function paramToString(param) {
//     if (param == undefined || param == null) {
//         return '';
//     }
//     if (param instanceof Date) {
//         return param.toJSON();
//     }
//     return param.toString();
// }

// function normalizeParams(params) {
//     var newParams = {};
//     for (var key in params) {
//         if (params.hasOwnProperty(key) && params[key] != undefined && params[key] != null) {
//             var value = params[key];
//             if (Array.isArray(value)) {
//                 newParams[key] = value;
//             } else {
//                 newParams[key] = paramToString(value);
//             }
//         }
//     }
//     return newParams;
// }

function processPost(payload, callback) {
    var resource = '/up/v1/capture-contexts';
    var method = 'post';
    var statusCode = -1;
    var url = 'https://' + requestHost + resource;
    var date = new Date(Date.now()).toUTCString();

    var headerParams = {};
    // var contentType = 'application/json; charset=utf-8';
    // var acceptType = 'application/jwt';

    // var request = superagent(method, url);

    // var bodyParam = payload;
    
    var digest = generateDigest(payload);
    digest = 'SHA-256=' + digest;
    console.log('\nGENERATED DIGEST:\n' + digest);

    var signature = getHttpSignature(resource, method, requestHost, payload, merchantId, merchantKeyId, merchantSecretKey, digest, date);
    console.log('\nGENERATED SIGNATURE:\n' + signature);


    // console.log('\n -- RequestURL --');
    // console.log('\tURL : ' + url);
    // console.log('\n -- HTTP Headers --');
    // console.log('\tContent-Type : ' + contentType);
    // console.log('\tv-c-merchant-id : ' + merchantId);
    // console.log('\tDate : ' + date);
    // console.log('\tHost : ' + requestHost);
    // console.log('\tSignature : ' + signature);
    // console.log('\tDigest : ' + digest);

    // console.log('\n -- RequestBody --');
    // console.log('\tbody : ' + bodyParam);

    headerParams['v-c-merchant-id'] = merchantId;
    headerParams['Date'] = date;
    headerParams['Host'] = requestHost;
    headerParams['Content-Type'] = "application/json";
    headerParams['User-Agent'] = 'Mozilla/5.0';
    headerParams['Digest'] = digest;
    headerParams['Signature'] = signature;
    // headerParams['Accept'] = acceptType;

    // Set header parameters
    // request.set(normalizeParams(headerParams));

    const options = {};
    options['method'] = method;
    options['url'] = url;
    options['headers'] = headerParams;
    options['body'] = payload;

    request(options, (error, response) => {
        if (error) throw new Error(error);

        if (response.statusCode === 201) {

        }
        var data = response.body;

        console.log('\n-- Response Message for POST call --');
        console.log('Response Code : ' + response['status']);
        console.log('v-c-correlation-id : ' + response.headers['v-c-correlation-id']);
        console.log('content-type : ' + response['Content-Type']);
        console.log('Response Data :');
        console.log(data);

        var _status = -1;
        if (response['status'] >= 200 && response['status'] <= 299) {
            _status = 0;
        }
        callback(error, data, response, _status);

    })

    // Set request timeout
    // request.timeout(60000);

    // request.type(contentType);

    // request.send(bodyParam);

    // request.accept(acceptType);
    // request.buffer();

    // request.end(function (error, response) {
    //     var data = response.body;

    //     if (
    //         data == null ||
    //         (typeof data === 'object' && typeof data.length === 'undefined' && !Object.keys(data).length)
    //     ) {
    //         // SuperAgent does not always produce a body; use the unparsed response as a fallback
    //         data = response.text;
    //     }

    //     console.log('\n -- Response Message for POST call --');
    //     console.log('\tResponse Code : ' + response['status']);
    //     console.log('\tv-c-correlation-id : ' + response.headers['v-c-correlation-id']);
    //     console.log('\tcontent-type : ' + response['Content-Type']);
    //     console.log('\tResponse Data :');
    //     console.log(data);

    //     var _status = -1;
    //     if (response['status'] >= 200 && response['status'] <= 299) {
    //         _status = 0;
    //     }

    //     callback(error, data, response, _status);
    // });

    return request;
}

function requestCaptureContext(payload, callback) {
    // HTTP POST REQUEST
    console.log('\n\nSample 1: POST call - CyberSource Payments API - HTTP POST Payment request');
    processPost(payload, function (error, data, response, statusCode) {
        if (statusCode == 0) {
            console.log('\nSTATUS : SUCCESS (HTTP Status = ' + statusCode + ')');
            console.log('\nCapture Context:\n' + data);
            callback(error, data, response, statusCode);
        } else {
            console.log('\nSTATUS : ERROR (HTTP Status = ' + statusCode + ')');
            callback(error, data, response, statusCode);
        }
    });
    return;
}

module.exports = requestCaptureContext;

