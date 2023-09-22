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
  RUT: {
    type: String,
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
    region: {
      type: String
    },
    comuna: {
      type: String
    },
    isApartment: {
      type: Boolean
    },
    apartamentNumber: {
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
    },
    optionSelectedIndex: {
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
