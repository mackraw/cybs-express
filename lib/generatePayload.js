const generatePayload = (data) => {
    const payload = {};

    payload['clientReferenceInformation'] = {};
    payload.clientReferenceInformation['code'] = 'simple_auth';

    payload['paymentInformation'] = {};
    payload.paymentInformation['card'] = {};
    payload.paymentInformation.card['number'] = data.number;
    payload.paymentInformation.card['expirationMonth'] = data.expirationMonth;
    payload.paymentInformation.card['expirationYear'] = data.expirationYear;

    payload['orderInformation'] = {};
    payload.orderInformation['amountDetails'] = {};
    payload.orderInformation.amountDetails['totalAmount'] = data.totalAmount;
    payload.orderInformation.amountDetails['currency'] = data.currency;

    payload['billTo'] = {};
    payload.billTo['firstName'] = data.firstName;
    payload.billTo['lastName'] = data.lastName;
    payload.billTo['address1'] = data.address1;
    payload.billTo['locality'] = data.locality;
    payload.billTo['administrativeArea'] = data.administrativeArea;
    payload.billTo['postalCode'] = data.postalCode;
    payload.billTo['country'] = data.country;
    payload.billTo['email'] = data.email;

    console.log('\nDATA:\n' + JSON.stringify(data));
    console.log('\nPAYLOAD:\n' + JSON.stringify(payload));
    return JSON.stringify(payload);
};

module.exports = generatePayload;
