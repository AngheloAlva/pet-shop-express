import { Schema, model } from 'mongoose'

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  state: {
    type: Boolean,
    default: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

export default model('Category', CategorySchema)
