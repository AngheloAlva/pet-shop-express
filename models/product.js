import { Schema, model } from 'mongoose'

const productSchema = new Schema({
  category: {
    type: String,
    required: true,
    ref: 'Category'
  },
  petType: {
    type: [String],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  miniDescription: {
    type: String,
    required: true
  },
  description: [{
    title: String,
    description: String
  }],
  image: {
    type: [String],
    required: true
  },
  weightOptions: [{
    weight: String,
    price: Number
  }],
  stock: {
    type: Number,
    required: true
  },
  brand: {
    type: String,
    required: true,
    ref: 'Brand'
  },
  lifeStage: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  }
})

export default model('Product', productSchema)
