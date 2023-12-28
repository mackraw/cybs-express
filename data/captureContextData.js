const captureContextData = {
    targetOrigins: ['http://localhost:4444'],
    clientVersion: '0.15',
    allowedCardNetworks: ['VISA', 'MASTERCARD', 'AMEX'],
    allowedPaymentTypes: ['PANENTRY', 'SRC', 'GOOGLEPAY'],
    country: 'US',
    locale: 'en_US',
    captureMandate: {
        billingType: 'FULL',
        requestEmail: true,
        requestPhone: true,
        requestShipping: true,
        shipToCountries: ['US', 'GB'],
        showAcceptedNetworkIcons: true,
    },
    orderInformation: {
        amountDetails: {
            totalAmount: '21.00',
            currency: 'USD',
        },
        billTo: {
            address1: '277 Park Avenue',
            address2: '50th Floor',
            address3: 'Desk NY-50110',
            address4: 'address4',
            administrativeArea: 'NY',
            buildingNumber: 'buildingNumber',
            country: 'US',
            district: 'district',
            locality: 'New York',
            postalCode: '10172',
            company: {
                name: 'Visa Inc',
                address1: '900 Metro Center Blvd',
                address2: 'address2',
                address3: 'address3',
                address4: 'address4',
                administrativeArea: 'CA',
                buildingNumber: '1',
                country: 'US',
                district: 'district',
                locality: 'Foster City',
                postalCode: '94404',
            },
            email: 'john.doe@visa.com',
            firstName: 'John',
            lastName: 'Doe',
            middleName: 'F',
            nameSuffix: 'Jr',
            title: 'Mr',
            phoneNumber: '1234567890',
            phoneType: 'phoneType',
        },
        shipTo: {
            address1: 'CyberSource',
            address2: 'Victoria House',
            address3: '15-17 Gloucester Street',
            address4: 'string',
            administrativeArea: 'CA',
            buildingNumber: 'string',
            country: 'GB',
            district: 'string',
            locality: 'Belfast',
            postalCode: 'BT1 4LS',
            firstName: 'Joe',
            lastName: 'Soap',
        },
    },
};

module.exports = captureContextData;