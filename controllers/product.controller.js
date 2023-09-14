import { request, response } from 'express'
import Product from '../models/product.js'
import Category from '../models/category.js'
import Brand from '../models/brand.js'

export const createProduct = async (req = request, res = response) => {
  const { name, category, brand, ...rest } = req.body

  // Search if the product already exists
  const productDB = await Product.findOne({ name })

  if (productDB) {
    return res.status(400).json({
      msg: `The product ${productDB.name} already exists`
    })
  }

  // Search if the category exists
  const categoryDB = await Category.findOne({ name: category })
  if (!categoryDB) {
    return res.status(400).json({
      msg: `The category ${category} does not exist`
    })
  }

  // Search if the brand exists
  const brandBD = await Brand.findOne({ name: brand })
  if (!brandBD) {
    return res.status(400).json({
      msg: `The brand ${brand} does not exist`
    })
  }

  // Create product
  const newProduct = new Product({
    name,
    category: categoryDB._id,
    brand: brandBD._id,
    ...rest
  })

  await newProduct.save()

  // Response
  res.status(201).json(newProduct)
}

export const getProducts = async (req = request, res = response) => {
  const { limit = 15, from = 0, category, brand, petType, discount, lifeStage } = req.query

  const query = { stock: { $gt: 0 } }
  if (category) query.category = category
  if (brand) query.brand = brand
  if (petType) query.petType = petType.toLowerCase()
  if (discount === 'true') query.discount = { $gt: 0 }
  if (lifeStage) query.lifeStage = lifeStage.toLowerCase()

  const [total, products] = await Promise.all([
    Product.find(query).countDocuments(),
    Product.find(query)
      .skip(Number(from))
      .limit(Number(limit))
      .populate('brand', ['name', 'image'])
      .populate('category', ['name', 'image', 'description'])
  ])
  return res.json({
    total,
    products
  })
}

export const getProductById = async (req = request, res = response) => {
  // Get id from params
  const { id } = req.params

  // Search product in DB
  const product = await Product.findById(id).populate('brand', ['name', 'image'])

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

export const getProductBySearch = async (req = request, res = response) => {
  const { term } = req.query
  const regex = new RegExp(term, 'i')
  console.log(regex)
  console.log(term)

  if (term === '') {
    return res.status(400).json({
      msg: 'Search term is required'
    })
  }

  const products = await Product.find({ name: regex })
    .populate('category', ['name', 'image', 'description'])

  res.json({
    total: products.length,
    products
  })
}
