import { request, response } from 'express'
import Category from '../models/category.js'

export const createCategory = async (req = request, res = response) => {
  // Get the name from the request body
  const { name, description, image, petType } = req.body

  // Check if the category already exists
  const categoryDB = await Category.findOne({ name })

  if (categoryDB) {
    return res.status(400).json({
      msg: `The category ${categoryDB.name} already exists`
    })
  }

  const newCategory = new Category({ name, description, image, petType })
  await newCategory.save()

  res.status(201).json({
    msg: `Category ${newCategory.name} created successfully`,
    newCategory
  })
}

export const getCategories = async (req = request, res = response) => {
  const { limit = 15, from = 0 } = req.query

  const [total, categories] = await Promise.all([
    Category.countDocuments(),
    Category.find()
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.status(200).json({
    total,
    categories
  })
}

export const getCategory = async (req = request, res = response) => {
  // Get the id from the request params
  const { id } = req.params

  // Check if the category exists
  const category = await Category.findById(id)

  res.status(200).json({
    msg: `Category ${category.name} found`,
    category
  })
}

export const updateCategory = async (req = request, res = response) => {
  const { id } = req.params
  const { name, description, image, status } = req.body

  const currentCategory = await Category.findById(id)
  if (!currentCategory) {
    return res.status(400).json({
      msg: `The category ${currentCategory.name} does not exist`
    })
  }

  if (currentCategory.name === name && currentCategory.description === description && currentCategory.image === image) {
    const categoryDB = await Category.findByIdAndUpdate(id, { status }, { new: true })
    return res.status(200).json({
      msg: `Category ${categoryDB.name} updated successfully`,
      categoryDB
    })
  }

  if (currentCategory.name !== name) {
    const existingCategory = await Category.findOne({ name })
    if (existingCategory) {
      return res.status(400).json({
        msg: `The category ${existingCategory.name} already exists`
      })
    }
  }

  const categoryDB = await Category.findByIdAndUpdate(id, { name, description, image, status }, { new: true })

  res.status(200).json({
    msg: `Category ${categoryDB.name} updated successfully`,
    categoryDB
  })
}

export const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params

  // Get the category from the database and change the status to false (soft delete)
  const categoryDeleted = await Category.findByIdAndUpdate(id, { status: false }, { new: true })

  res.status(200).json({
    msg: `Category ${categoryDeleted.name} deleted successfully`,
    categoryDeleted
  })
}
