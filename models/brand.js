import { Schema, model } from 'mongoose'

const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: Boolean,
    default: true,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }]
})

export default model('Brand', brandSchema)
