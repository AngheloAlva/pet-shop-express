import { request, response } from 'express'
import User from '../models/user.js'

export const createUser = async (req = request, res = response) => {
  const data = req.body
  const user = new User({ ...data })

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

  res.json({
    total,
    users
  })
}

export const getUserById = async (req = request, res = response) => {
  const { id } = req.params
  const user = await User.findById(id)

  res.json({
    user
  })
}

export const deleteUser = async (req = request, res = response) => {
  const { id } = req.params
  const user = await User.findByIdAndUpdate(id, { status: false })

  res.json({
    user
  })
}
