import { Schema, model } from 'mongoose'

const productSchema = new Schema({
  category: {
    type: String,
    required: true,
    ref: 'Category'
  },
  petType: [{
    name: String
  }],
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
  options: [{
    option: String,
    price: Number,
    stock: Number,
    discount: Number
  }],
  brand: {
    type: String,
    required: true,
    ref: 'Brand'
  },
  lifeStage: [{
    type: String,
    required: true
  }]
})

productSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject()
  return data
}

export default model('Product', productSchema)
