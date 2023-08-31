import { request, response } from 'express'
import Category from '../models/category.js'

export const createCategory = async (req = request, res = response) => {
  // Get the name from the request body
  const { name } = req.body

  // Check if the category already exists
  const categoryDB = await Category.findOne({ name })

  if (categoryDB) {
    return res.status(400).json({
      msg: `The category ${categoryDB.name} already exists`
    })
  }

  const newCategory = new Category({ name })
  await newCategory.save()

  res.status(201).json(newCategory)
}

export const getCategories = async (req = request, res = response) => {
  const categories = await Category.find()
  res.json(categories)
}

export const getCategory = async (req = request, res = response) => {
  // Get the id from the request params
  const { id } = req.params

  // Check if the category exists
  const category = await Category.findById(id)
  res.json(category)
}

export const updateCategory = async (req = request, res = response) => {
  // Get the id from the request params
  const { id } = req.params
  const data = req.body

  // Get the category from the database
  const category = await Category.findByIdAndUpdate(id, data, { new: true })

  res.json(category)
}

export const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params

  // Get the category from the database and change the status to false (soft delete)
  const categoryDeleted = await Category.findByIdAndUpdate(id, { status: false }, { new: true })

  res.json(categoryDeleted)
}
