import { request, response } from 'express'
import Orders from '../models/order.js'

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

export const getOrdersByUserId = async (req = request, res = response) => {
  const { userId } = req.params
  const { limit = 10, from = 0 } = req.query

  const [total, orders] = await Promise.all([
    Orders.countDocuments({ userId }),
    Orders.find({ userId })
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.json({
    total,
    orders
  })
}
