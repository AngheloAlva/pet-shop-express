import { Schema, model } from 'mongoose'

const productSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  petType: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  miniDescription: {
    type: String,
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
  weightOptions: {
    type: [String],
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  discount: {
    type: Number,
    default: 0
  }
})

export default model('Product', productSchema)
