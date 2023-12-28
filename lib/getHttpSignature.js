const crypto = require('crypto');

const getHttpSignature = (merchantId, merchantKeyId, merchantSecretKey, method, requestHost, date, resource, digest) => {
    
    // Create validation string 
    let validationString = '';
    validationString = 'host: ' + requestHost;
    validationString += '\ndate: ' + date;
    validationString += '\nrequest-target: ';
    
    if (method === 'get') {
        const targetUrlForGet = 'get ' + resource;
        validationString += targetUrlForGet + '\n';
    } else if (method === 'post') {
        const targetUrlForPost = 'post ' + resource;
        validationString += targetUrlForPost + '\n';
        validationString += 'digest: ' + digest + '\n';
    }
    
    validationString += 'v-c-merchant-id: ' + merchantId;
    console.log("\nVALIDATION STRING:\n" + validationString);
    
    // Create the 'Signature' header
    let headerSignature = '';
    headerSignature += 'keyid="' + merchantKeyId + '"';
    headerSignature += ', algorithm="HmacSHA256"'; //should be always HmacSHA256
    
    // Headers list depends on the HTTP method
    // Digest is not required for GET 
    if (method === 'get') {
        const headersForGetMethod = 'host date request-target v-c-merchant-id';
        headerSignature += ', headers="' + headersForGetMethod + '"';
    } else if (method === 'post') {
        const headersForPostMethod = 'host date request-target digest v-c-merchant-id';
        headerSignature += ', headers="' + headersForPostMethod + '"';
    }
    
    let signatureHash = '';
    const data = new Buffer.from(validationString, 'utf8');
    const key = new Buffer.from(merchantSecretKey, 'base64'); // Decoding secret key
    signatureHash = crypto.createHmac('sha256', key).update(data).digest('base64');
    headerSignature += ', signature="' + signatureHash + '"';
    console.log("\nSIGNATURE HASH: " + signatureHash);

    return headerSignature;
}

module.exports = getHttpSignature;