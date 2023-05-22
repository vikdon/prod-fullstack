const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: ''
  },
  surname: {
    type: String,
    default: ''
  },   
  phone: {
    type: String,
    default: ''
  },
  telegramId: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('users', userSchema)