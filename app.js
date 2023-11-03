const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const crypto = require('crypto')

// Set up routes
const indexRouter = require('./routes/index')


const app = express()


// Set up views 
app.set('view engine', 'ejs')
app.set('views', __dirname + '\\views')

app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', indexRouter)

app.listen(4444)
