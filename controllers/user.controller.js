import { request, response } from 'express'
import User from '../models/user.js'

export const createUser = async (req = request, res = response) => {
  const { id, name, email } = req.body

  const userDB = await User.findOne({ id })
  if (userDB) {
    return res.status(400).json({
      msg: 'El usuario con el id ya existe'
    })
  }

  const user = new User({
    id,
    name,
    email
  })
  await user.save()

  res.status(201).json({
    msg: `Usuario ${user.name} creado`,
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

  res.status(200).json({
    msg: `Usuario ${user.name} encontrado`,
    user
  })
}

export const deleteUser = async (req = request, res = response) => {
  const { id } = req.params
  const user = await User.findOneAndUpdate({ id }, { status: false })

  res.json({
    msg: `Usuario ${user.name} eliminado`,
    user
  })
}

export const updateUser = async (req = request, res = response) => {
  const { id } = req.params
  const { name, lastName, address, RUT, phone, orderHistory, cart, lastProductsViewed } = req.body

  const userRUT = await User.findOne({ RUT })
  if (userRUT) {
    return res.status(400).json({
      msg: 'Este rut ya está registrado'
    })
  }

  const user = await User.findOneAndUpdate({ id }, { name, lastName, address, RUT, phone, orderHistory, cart, lastProductsViewed }, { new: true })

  if (user) {
    res.status(200).json({
      msg: `Usuario ${user.name} actualizado`,
      user
    })
  }
}

export const addProductToCart = async (req = request, res = response) => {
  const { userId, productId, quantity, optionSelectedIndex } = req.body

  const user = await User.findOne({ id: userId })
  if (!user) {
    return res.status(400).json({
      msg: `El usuario con el id ${userId} no existe`
    })
  }

  const item = user.cart.find(item => item.product.toString() === productId && item.optionSelectedIndex === optionSelectedIndex)
  if (item) {
    item.quantity += quantity
  } else {
    user.cart.push({ product: productId, quantity, optionSelectedIndex })
  }

  const cart = user.cart
  await user.save()

  res.json({
    msg: `Producto ${productId} agregado al carrito`,
    cart
  })
}

export const getCart = async (req = request, res = response) => {
  const { id } = req.params

  const user = await User.findOne({ id }).populate('cart')
  if (!user) {
    return res.status(400).json({
      msg: `El usuario con el id ${id} no existe`
    })
  }

  const cart = user.cart

  res.status(200).json({
    msg: `Carrito del usuario ${user.name}`,
    cart
  })
}

export const updateCart = async (req = request, res = response) => {
  const { userId, productId, quantity } = req.body

  const user = await User.findOne({ id: userId })
  if (!user) {
    return res.status(400).json({
      msg: `El usuario con el id ${userId} no existe`
    })
  }

  if (quantity > 0) {
    await User.findOneAndUpdate(
      { id: userId, 'cart.product': productId },
      { $set: { 'cart.$.quantity': quantity } }
    )
  } else {
    await User.findOneAndUpdate(
      { id: userId },
      { $pull: { cart: { product: productId } } }
    )
  }

  const cart = await User.findOne({ id: userId }).populate('cart')

  res.json({
    msg: `Producto ${productId} actualizado`,
    cart
  })
}
