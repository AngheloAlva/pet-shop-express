import { request, response } from 'express'
import Product from '../models/product.js'
import Category from '../models/category.js'
import Brand from '../models/brand.js'

export const createProduct = async (req = request, res = response) => {
  const { name, categoryId, brandId, ...rest } = req.body

  const productDB = await Product.findOne({ name })

  if (productDB) {
    return res.status(400).json({
      msg: `The product ${productDB.name} already exists`
    })
  }

  const categoryDB = await Category.findOne({ _id: categoryId })
  if (!categoryDB) {
    return res.status(400).json({
      msg: `The category ${categoryId} does not exist`
    })
  }

  const brandBD = await Brand.findOne({ _id: brandId })
  if (!brandBD) {
    return res.status(400).json({
      msg: `The brand ${brandId} does not exist`
    })
  }

  const newProduct = new Product({
    name,
    category: categoryDB._id,
    brand: brandBD._id,
    ...rest
  })

  await newProduct.save()

  res.status(201).json({
    msg: `Product ${newProduct.name} created`,
    newProduct
  })
}

export const getProducts = async (req = request, res = response) => {
  const { limit = 15, from = 0, category, brand, petType = [], lifeStage } = req.query

  const query = {}
  if (category) query.category = category
  if (brand) query.brand = brand
  if (petType.length > 0) query.petType = { $in: petType }
  if (lifeStage) query.lifeStage = lifeStage.toLowerCase()

  const [total, products] = await Promise.all([
    Product.find(query).countDocuments(),
    Product.find(query)
      .skip(Number(from))
      .limit(Number(limit))
      .populate('brand', ['name', 'image'])
      .populate('category', ['name', 'image', 'description'])
  ])
  res.status(200).json({
    total,
    products
  })
}

export const getProductById = async (req = request, res = response) => {
  const { id } = req.params

  const product = await Product.findById(id).populate('brand', ['name', 'image'])
  if (!product) {
    return res.status(404).json({
      msg: 'Product not found'
    })
  }

  res.status(200).json({
    msg: 'Product found',
    product
  })
}

export const updateProduct = async (req = request, res = response) => {
  const { id } = req.params
  const { _id, ...data } = req.body

  const product = await Product.findByIdAndUpdate(id, data, { new: true })

  res.status(200).json({
    msg: `Product ${product.name} updated`,
    product
  })
}

export const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params

  const productDeleted = await Product.findByIdAndUpdate(id, { status: false }, { new: true })

  res.status(200).json({
    msg: `Product ${productDeleted.name} deleted`,
    productDeleted
  })
}

export const getProductBySearch = async (req = request, res = response) => {
  const { term } = req.query
  const regex = new RegExp(term, 'i')

  if (term === '') {
    return res.status(400).json({
      msg: 'Search term is required'
    })
  }

  const products = await Product.find({ name: regex })
    .populate('category', ['name', 'image', 'description'])
    .populate('brand', ['name', 'image'])

  res.status(200).json({
    total: products.length,
    products
  })
}
