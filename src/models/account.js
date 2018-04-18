import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose'

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  fullName: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }]
});

AccountSchema.plugin(passportLocalMongoose)

export default mongoose.model('Account', AccountSchema)
