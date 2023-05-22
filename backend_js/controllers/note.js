const Note = require('../models/Note')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
  try {
    const notes = await Note.find({user: req.user.id})
    res.status(200).json(notes)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async function(req, res) {
  try {
    const note = await Note.findById(req.params.id)
    res.status(200).json(note)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function(req, res) {
  try {
    await Note.remove({_id: req.params.id})
    res.status(200).json({
      message: 'Note removed'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function(req, res) {
  const note = new Note({
    title: req.body.title,
    details: req.body.details,
    active: true,
    user: req.user.id,
  })

  try {
    await note.save()
    res.status(201).json(note)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function(req, res) {
  const updated = {
    title: req.body.title,
    details: req.body.details
  }

  try {
    const note = await Note.findOneAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true}
    )
    res.status(200).json(note)
  } catch (e) {
    errorHandler(res, e)
  }
}