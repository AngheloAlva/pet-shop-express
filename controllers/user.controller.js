import { request, response } from 'express'
import User from '../models/user.js'

export const createUser = async (req = request, res = response) => {
  const { id, name, lastName, email, role, address, phone, orderHistory, cart, lastProductsViewed } = req.body

  const user = new User({
    id,
    name,
    lastName,
    email,
    role,
    address,
    phone,
    orderHistory,
    cart,
    lastProductsViewed
  })

  await user.save()

  res.json({
    user
  })
}

export const getUsers = async (req = request, res = response) => {
  const { limit = 10, from = 0 } = req.query
  const query = { status: true }

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(Number(from))
      .limit(Number(limit))
  ])

  if (!users) {
    res.status(400).json({
      msg: 'No existen usuarios'
    })
  }

  res.json({
    total,
    users
  })
}

export const getUserById = async (req = request, res = response) => {
  const { id } = req.params

  const user = await User.find({ id })

  if (!user) {
    res.status(400).json({
      msg: `No existe un usuario con el id ${id}`
    })
  }

  res.json({
    user
  })
}

export const getUserCart = async (req = request, res = response) => {
  const { id } = req.params

  const userCart = await User.find({ id }).populate('cart')

  if (!userCart) {
    res.status(400).json({
      msg: `No existe un usuario con el id ${id}`
    })
  }

  res.json({
    userCart
  })
}

export const deleteUser = async (req = request, res = response) => {
  const { id } = req.params
  const user = await User.findOneAndUpdate({ id }, { status: false })

  res.json({
    user
  })
}
