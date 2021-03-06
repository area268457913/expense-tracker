const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({

  name: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  date: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },
  icon: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('Rec', recordSchema)