import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  subTitle: String,
  status: String,
  labels: Array,
  date: {
    type: Date,
    default: Date.now()
  },
  billable: Boolean,
  subTasks: Array,
  priorityLevel: Number,
  totalTime: Number,
  measurements: [{
    startTime: Number,
    endTime: Number,
    total: Number,
    isPosted: Boolean
  }],
  misc: {},
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  }
});

export default mongoose.model('Task', taskSchema)
