import { request, response } from 'express'
import Product from '../models/product.js'

export const createProduct = async (req = request, res = response) => {
  const {
    category,
    petType,
    name,
    price,
    miniDescription,
    description,
    image,
    weightOptions,
    stock,
    brand,
    tags,
    discount
  } = req.body

  // Search if the product already exists
  const productDB = await Product.findOne({ name })

  if (productDB) {
    return res.status(400).json({
      msg: `The product ${productDB.name} already exists`
    })
  }

  // Generate data to save
  const data = {
    category,
    petType,
    name,
    price,
    miniDescription,
    description,
    image,
    weightOptions,
    stock,
    brand,
    tags,
    discount
  }

  // Create product
  const newProduct = new Product(data)
  await newProduct.save()

  // Response
  res.status(201).json(newProduct)
}

export const getProducts = async (req = request, res = response) => {
  // Get query params
  const { limit = 15, from = 0 } = await req.query
  const query = { state: true }

  // Search products in DB (with pagination) and total products
  const [total, products] = await Promise.all([
    Product.find(query)
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.json({
    total,
    products
  })
}

export const getProductById = async (req = request, res = response) => {
  // Get id from params
  const { id } = req.params

  // Search product in DB
  const product = await Product.findById(id)

  res.json(product)
}

export const updateProduct = async (req = request, res = response) => {
  // Get id from params
  const { id } = req.params

  // Get data to update
  const { _id, ...data } = req.body

  // Update product in DB (new: true -> return the updated product)
  const product = await Product.findByIdAndUpdate(id, data, { new: true })

  res.json(product)
}

export const deleteProduct = async (req = request, res = response) => {
  // Get id from params
  const { id } = req.params

  // Delete product from DB (soft delete)
  const productDeleted = await Product.findByIdAndUpdate(id, { stock: 0 }, { new: true })

  res.json(productDeleted)
}