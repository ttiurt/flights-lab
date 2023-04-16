import mongoose from 'mongoose'

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: {
    type: String,
    required: true,
    enum: ['American', 'Southwest', 'United']
  },
  airport: {
    type: String,
    required: true, 
    default: 'DEN',
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999,
  },
  departs: Date,
}, {
  timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}