const express = require('express');
const router = express.Router();
const request = require('request');
const generateDigest = require('../lib/generateDigest');
const getHttpSignature = require('../lib/getHttpSignature');
const generatePayload = require('../lib/generatePayload');

router.get('/', (req, res) => {
    res.render('auth');
});

router.post('/processPayment', (req, res) => {
    const merchantId = process.env.CYBS_MID;
    const keyId = process.env.CYBS_KEY_ID;
    const requestHost = process.env.CYBS_HOST;
    const secretKey = process.env.CYBS_SHARED_SECRET;
    const payload = generatePayload(req.body)
    const resource = '/pts/v2/payments/';
    const method = 'post';
    const url = `https://${requestHost}${resource}`;
    const date = new Date(Date.now()).toUTCString();
    const digest = 'SHA-256=' + generateDigest(payload);
    const signature = getHttpSignature(merchantId, keyId, secretKey, method, requestHost, date, resource, digest);

    const headerParams = {};
    headerParams['v-c-merchant-id'] = merchantId;
    headerParams['Date'] = date;
    headerParams['Host'] = requestHost;
    headerParams['Content-Type'] = 'application/json';
    headerParams['User-Agent'] = 'Mozilla/5.0';
    headerParams['Digest'] = digest;
    headerParams['Signature'] = signature;

    const options = {};
    options['method'] = method;
    options['url'] = url;
    options['headers'] = headerParams;
    options['body'] = payload;

    console.log('\nHEADER PARAMS:\n' + JSON.stringify(headerParams));
    console.log('\nOPTIONS OBJECT:\n' + JSON.stringify(options));

    try {
        request(options, (error, response) => {
            if (error) {
                console.log('\nERROR: ' + JSON.stringify(error));
                console.log('\nError Status Code: ' + error.statusCode);
            } else if (response.statusCode === 201) {
                const body = JSON.parse(response.body);
                console.log(`\nSUCCESS: ${response.statusCode} ${response.body.status}\n ${response.body}`);
                res.render('auth/processPayment', { params: body });
            } else {
                console.log('\nEncountered problem: ' + response.statusCode + '\n' + JSON.stringify(response.body));
            }
        });
    } catch (error) {
        console.log('\nERROR:\n' + error);
    }
});

module.exports = router;

