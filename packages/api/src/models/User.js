import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, required: true },
  hashedPassword: { type: String, required: true },
})

export default model('User', userSchema)
