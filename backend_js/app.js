const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const noteRoutes = require('./routes/note')
const conf = require('./config/conf')
const app = express()

mongoose.connect(conf.mongoURI,{dbName: conf.mongoDB})
  .then(() => console.log('MongoDB connected.'))
  .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/note', noteRoutes)


module.exports = app