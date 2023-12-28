const crypto = require('crypto');

const generateDigest = (payload) => {
    const buffer = Buffer.from(payload, 'utf8');
    const hash = crypto.createHash('sha256');
    hash.update(buffer);
    digest = hash.digest('base64');

    console.log('\nDIGEST:\n' + digest);

    return digest;
};

module.exports = generateDigest;
