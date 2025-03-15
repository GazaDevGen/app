import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: String,
    default: 'admin'
  }
})

const User = mongoose.model('users', userSchema);


export default User