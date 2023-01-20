const mongoose = require('mongoose')

const recognitionSchema = new mongoose.Schema({
  neutral: Number,
  happy: Number,
  sad: Number,
  angry: Number,
  fearful: Number,
  disgusted: Number,
  surprised: Number,
  predict: String,
  image: String,
  meetingId: String,
  userId: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

recognitionSchema.set('toJSON', {
  versionKey: false,
})

module.exports = mongoose.model('Recognition', recognitionSchema)
