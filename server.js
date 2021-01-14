if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()

// Including routes
const indexRouter = require('./routes/index')

// Setting and using View Engine
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// Parsing incoming data
app.use(express.json())

// Connect to database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.error('Connected to mongoose'))

// Triggering the routes
app.use('/', indexRouter)

// Triggering the server 
app.listen(process.env.PORT || 3000)