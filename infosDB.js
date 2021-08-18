import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/graphql', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const Schema = new mongoose.Schema({
  pl_name: {
    type: String,
    required: true
  },
  hostname: {
    type: String,
    required: true
  },
  pl_bmassj: {
    type: String,
    required: true
  },
  disc_year: {
    type: Number,
    required: true
  },
  hasstation: {
    type: Boolean,
    default: false
  },
  recharge: {
    type: String,
    default: null
  }
})

export default mongoose.model('Planets', Schema);
