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

  res.status(201).json(newBrand)
}

export const getBrands = async (req = request, res = response) => {
  const { limit = 15, from = 0 } = req.query
  const query = { state: true }

  const [total, brands] = await Promise.all([
    Brand.countDocuments(query),
    Brand.find(query)
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.json({
    total,
    brands
  })
}

export const deleteBrand = async (req = request, res = response) => {
  const { id } = req.params

  const brandDB = await Brand.findByIdAndUpdate(id, { state: false }, { new: true })

  res.json(brandDB)
}
