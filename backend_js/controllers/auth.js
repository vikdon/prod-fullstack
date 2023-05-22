const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const conf = require('../config/conf')
const errorHandler = require('../utils/errorHandler')


module.exports.login = async function(req, res) {
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    // Check password, user exist
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      // Token generation, passwords match
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, conf.jwt, {expiresIn: 60 * 60})

      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      // Passwords mismatch
      res.status(401).json({
        message: 'Password incorrect. Try again.'
      })
    }
  } else {
    // Email absent
    res.status(404).json({
      message: 'User not found.'
    })
  }
}

module.exports.register = async function(req, res) {
  // email password
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    // The user exists, an error must be sent
    res.status(409).json({
      message: 'This email is already taken. Try another one.'
    })
  } else {
    // A user needs to be created
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })
 
    try {
      await user.save()
      res.status(201).json(user)
    } catch(e) {
      errorHandler(res, e)
    }

  }
}

module.exports.reset = async function(req, res) {
  // email password
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    // The user exists, an error must be sent
    res.status(409).json({
      message: 'This email is already taken. Try another one.'
    })
  } else {
    // A user needs to be created
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })

    try {
      await user.save()
      res.status(201).json(user)
    } catch(e) {
      errorHandler(res, e)
    }

  }
}