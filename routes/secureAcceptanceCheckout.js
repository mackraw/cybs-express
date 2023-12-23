const express = require('express');
const crypto = require('crypto');
const router = express.Router();

router.get('/', (req, res) => {
    const uuid = req.app.locals.generateUUIDv4();
    const accessKey = process.env.SECURE_ACCEPTANCE_SOP_ACCESS_KEY;
    const profileId = process.env.SECURE_ACCEPTANCE_SOP_PROFILE_ID;

    res.render('secureAcceptanceCheckout', {
        uuid: uuid,
        accessKey: accessKey,
        profileId: profileId,
    });
});

router.post('/confirmation', (req, res) => {
    const HMAC_SHA256 = 'sha256';
    const SECRET_KEY = process.env.SECURE_ACCEPTANCE_SOP_SECRET_KEY;

    function sign(params) {
        return signData(buildDataToSign(params), SECRET_KEY);
    }

    function signData(data, secretKey) {
        return Buffer.from(crypto.createHmac(HMAC_SHA256, secretKey).update(data).digest()).toString('base64');
    }

    function buildDataToSign(params) {
        const signedFieldNames = params['signed_field_names'].split(',');
        const dataToSign = signedFieldNames.map((field) => `${field}=${params[field]}`);
        return commaSeparate(dataToSign);
    }

    function commaSeparate(dataToSign) {
        return dataToSign.join(',');
    }

    const params = req.body;

    console.log('============ PARAMS =============');
    console.log(params);

    const signature = signData(buildDataToSign(params), SECRET_KEY);

    res.render('secureAcceptanceCheckout/confirmation', { signature: signature, params: params });
});

router.post('/receipt', (req, res) => {
    res.render('secureAcceptanceCheckout/receipt', { params: req.body });

});


module.exports = router;
