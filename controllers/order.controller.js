import { request, response } from 'express'
import Orders from '../models/order.js'

export const createOrder = async (req = request, res = response) => {
  const { id, userId, RUT, products, total, paymentMethod, paymentStatus, shippingMethod, shippingStatus, shippingAddress } = req.body

  const order = new Orders({
    id,
    userId,
    RUT,
    products,
    total,
    paymentMethod,
    paymentStatus,
    shippingMethod,
    shippingStatus,
    shippingAddress
  })

  await order.save()

  res.json({
    order
  })
}

export const getOrders = async (req = request, res = response) => {
  const { limit = 10, from = 0 } = req.query

  const [total, orders] = await Promise.all([
    Orders.countDocuments(),
    Orders.find()
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.json({
    total,
    orders
  })
}
