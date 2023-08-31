import { Schema, model } from 'mongoose'

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'The name is required']
  },
  state: {
    type: Boolean,
    default: true,
    required: true
  }
})

export default model('Category', CategorySchema)
