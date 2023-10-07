import { Schema, model } from 'mongoose'

const OrderSchema = new Schema({
  userId: {
    type: String,
    ref: 'User'
  },
  products: [{
    price_data: {
      currency: { type: String },
      product_data: {
        name: { type: String },
        description: { type: String }
      },
      unit_amount: { type: Number }
    },
    quantity: { type: Number }
  }],
  createAt: {
    type: Date,
    default: Date.now
  },
  total: {
    type: Number
  },
  shippingMethod: {
    type: String,
    enum: ['DELIVERY', 'PICKUP'],
    required: true
  },
  shippingAddress: {
    street: { type: String },
    number: { type: Number },
    region: { type: String },
    comuna: { type: String },
    isApartment: { type: Boolean },
    apartmentNumber: { type: Number },
    zipCode: { type: Number }
  },
  paid: {
    type: Boolean,
    default: false
  },
  checkoutSessionId: {
    type: String,
    required: true,
    unique: true
  }
})

export default model('Order', OrderSchema)
