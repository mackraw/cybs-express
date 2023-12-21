const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const crypto = require('crypto');

// Set up routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const microform11Router = require('./routes/microform11');
const secureAcceptanceWebMobileRouter = require('./routes/secureAcceptanceWebMobile');

const app = express();

// Set up views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/microform11', microform11Router);
app.use('/secureAcceptanceWebMobile', secureAcceptanceWebMobileRouter);

app.locals.generateUUIDv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
};

app.locals.getTimeStamp = () => {
    const d = new Date();
    const yy = ('' + d.getFullYear()).slice(-2);
    const mm = ('0' + d.getMonth()).slice(-2);
    const dd = ('0' + d.getDate()).slice(-2);
    const h = ('0' + d.getHours()).slice(-2);
    const m = ('0' + d.getMinutes()).slice(-2);
    const s = ('0' + d.getSeconds()).slice(-2);
    return yy + mm + dd + '_' + h + m + s;
};

app.listen(4444);
