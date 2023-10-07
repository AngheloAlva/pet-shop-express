import { request, response } from 'express'
import Product from '../models/product.js'
import Order from '../models/order.js'
import User from '../models/user.js'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const createCheckoutSession = async (req = request, res = response) => {
  const { items, payShipping, userId } = req.body

  const lineItems = []
  let total = 0

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

    total += price * item.quantity

    lineItems.push({
      price_data: {
        currency: 'clp',
        product_data: {
          name: product.name + ' ' + product.options[item.optionSelectedIndex].option,
          description: product.miniDescription
        },
        unit_amount: price
      },
      quantity: item.quantity
    })
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

    total += 3000
  }

  const user = await User.findOne({ id: userId })

  if (!user) {
    return res.status(404).json({
      message: 'Error getting user address'
    })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.DOMAIN}/success`,
    cancel_url: `${process.env.DOMAIN}/cancel`
  })

  if (!session) {
    return res.status(500).json({
      message: 'Error creating checkout session'
    })
  }

  const order = new Order({
    userId,
    products: lineItems,
    total,
    shippingMethod: payShipping ? 'DELIVERY' : 'PICKUP',
    shippingAddress: user.address,
    paid: false,
    checkoutSessionId: session.id
  })
  await order.save()

  user.cart = []
  await user.save()

  res.status(200).json({
    msg: 'Checkout session created',
    url: session.url
  })
}

export const stripeWebhook = async (req = request, res = response) => {
  const event = req.body

  switch (event.type) {
    case 'checkout.session.completed':{
      const session = event.data.object

      const newOrder = await Order.findOne({ checkoutSessionId: session.id })
      if (!newOrder) {
        return res.status(404).json({
          message: 'Order not found'
        })
      }

      for (const item of newOrder.products) {
        const product = await Product.findById(item.product)
        if (product.stock < item.quantity) {
          return res.status(400).json({
            message: `Not enough stock for ${product.name}`
          })
        } else {
          product.stock = product.stock - item.quantity
          await product.save()
        }
      }

      newOrder.paid = true
      await newOrder.save()

      break
    }
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  res.json({ received: true })
}
