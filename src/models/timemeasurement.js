import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const measurementSchema = new Schema({
  startTime: {
    type: Number,
    required: true
  },
  endTime: {
    type: Number,
    required: false
  },
  createdBy: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Account'
  },
  taskId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Task'
  },
  total: Number,
  isFinished: {
    type: Boolean,
    required: true
  } 
})

export default mongoose.model('Timemeasurement', measurementSchema)
