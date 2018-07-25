import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectTitle: String,
  projectDescription: String,
  favorite: Boolean,
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  }
});

export default mongoose.model('Project', projectSchema)
