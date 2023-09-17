import { Schema, model } from 'mongoose'

const OrderSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  RUT: {
    type: String,
    required: true
  },
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      default: 1
    },
    price: {
      type: Number,
      default: 0
    }
  }],
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'CANCELED'],
    default: 'PENDING'
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  total: { type: Number },
  paymentMethod: {
    type: String,
    enum: ['CREDIT_CARD', 'DEBIT_CARD', 'TRANSFER', 'CASH'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'CANCELED'],
    default: 'PENDING'
  },
  shippingMethod: {
    type: String,
    enum: ['CHILEXPRESS', 'STARKEN', 'BLUE EXPRESS', 'PICKUP', 'SHOP DELIVERY'],
    required: true
  },
  shippingStatus: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'CANCELED'],
    default: 'PENDING'
  },
  shippingAddress: {
    street: { type: String },
    number: { type: Number },
    zipCode: { type: Number },
    city: { type: String },
    region: { type: String },
    isApartment: { type: Boolean },
    apartmentNumber: { type: Number }
  }
})

export default model('Order', OrderSchema)
