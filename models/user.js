import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    default: 'USER_ROLE'
  },
  status: {
    type: Boolean,
    default: true
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  address: {
    street: {
      type: String
    },
    number: {
      type: Number
    },
    zipCode: {
      type: Number
    },
    city: {
      type: String
    },
    region: {
      type: String
    },
    isApartment: {
      type: Boolean
    },
    apartmentNumber: {
      type: Number
    }
  },
  phone: {
    type: String
  },
  ordersHistory: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }],
  cart: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  lastProductsViewed: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
})

export default model('User', UserSchema)
