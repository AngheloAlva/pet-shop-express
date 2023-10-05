import { request, response } from 'express'
import Product from '../models/product.js'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const createCheckoutSession = async (req = request, res = response) => {
  const { items, payShipping } = req.body

  const lineItems = []

  for (const item of items) {
    const product = await Product.findById(item.id)
    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      })
    }
    if (product.stock === 0) {
      return res.status(400).json({
        message: `No stock for ${product.name}`
      })
    }
    if (item.quantity > product.stock || item.quantity < 1) {
      return res.status(400).json({
        message: `Not enough stock for ${product.name}`
      })
    }

    let price = product.options[item.optionSelectedIndex].price
    if (product.options[item.optionSelectedIndex].discount > 0) {
      const discount = product.options[item.optionSelectedIndex].discount
      price = price - (price * (discount / 100))
    } else {
      price = product.options[item.optionSelectedIndex].price
    }

    lineItems.push({
      price_data: {
        currency: 'clp',
        product_data: {
          name: product.name,
          description: product.miniDescription
        },
        unit_amount: price
      },
      quantity: item.quantity
    })

    product.stock -= item.quantity
  }

  if (payShipping) {
    lineItems.push({
      price_data: {
        currency: 'clp',
        product_data: {
          name: 'Shipping'
        },
        unit_amount: 3000
      },
      quantity: 1
    })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel'
  })

  res.status(200).json({
    msg: 'Checkout session created',
    url: session.url
  })
}
