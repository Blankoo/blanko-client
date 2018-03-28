import mongoose from 'mongoose'
const Schema = mongoose.Schema

const BetaReleaseEmailSchema = new Schema({

   email: {
     type: String,
     required: true
   } 

})

export default mongoose.model('BetaReleaseEmail', BetaReleaseEmailSchema)
