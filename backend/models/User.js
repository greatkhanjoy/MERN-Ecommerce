import bcrypt from 'bcryptjs'
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

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}
export default mongoose.model('User', UserSchema)
