import { request, response } from 'express'
import Brand from '../models/brand.js'

export const createBrand = async (req = request, res = response) => {
  const { name, image } = req.body

  const brandDB = await Brand.findOne({ name })
  if (brandDB) {
    return res.status(400).json({
      msg: `The brand ${brandDB.name} already exists`
    })
  }

  const newBrand = new Brand({ name, image })
  await newBrand.save()

  res.status(201).json({
    msg: `Brand ${newBrand.name} created successfully`,
    newBrand
  })
}

export const getBrands = async (req = request, res = response) => {
  const { limit = 15, from = 0 } = req.query

  const [total, brands] = await Promise.all([
    Brand.countDocuments(),
    Brand.find()
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.status(200).json({
    total,
    brands
  })
}

export const getBrandById = async (req = request, res = response) => {
  const { id } = req.params

  const brand = await Brand.findById(id)

  res.status(200).json({
    brand
  })
}

export const updateBrand = async (req = request, res = response) => {
  const { id } = req.params
  const { name, image, status } = req.body

  const currentBrand = await Brand.findById(id)
  if (!currentBrand) {
    return res.status(400).json({
      msg: `The brand ${currentBrand.name} does not exist`
    })
  }

  if (currentBrand.name === name && currentBrand.image === image) {
    const brandDB = await Brand.findByIdAndUpdate(id, { status }, { new: true })
    return res.status(200).json({
      msg: `Brand ${brandDB.name} updated successfully`,
      brandDB
    })
  }

  if (currentBrand.name !== name) {
    const existingBrand = await Brand.findOne({ name })
    if (existingBrand) {
      return res.status(400).json({
        msg: `The brand ${existingBrand.name} already exists`
      })
    }
  }

  const brandDB = await Brand.findByIdAndUpdate(id, { name, image, status }, { new: true })

  res.status(200).json({
    msg: `Brand ${brandDB.name} updated successfully`,
    brandDB
  })
}

export const deleteBrand = async (req = request, res = response) => {
  const { id } = req.params

  const brandDeleted = await Brand.findByIdAndUpdate(id, { status: false }, { new: true })

  res.status(200).json({
    msg: `Brand ${brandDeleted.name} deleted successfully`,
    brandDeleted
  })
}
