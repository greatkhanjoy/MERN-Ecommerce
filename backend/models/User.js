import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      required: [true, 'role is required'],
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.model('User', UserSchema)
