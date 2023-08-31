import { Router } from 'express'
import { check } from 'express-validator'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById
} from '../controllers/product.controller.js'

const router = Router()

router.post('/', [
  check('Category', 'Category is required').not().isEmpty(),
  check('petType', 'Pet Type is required').not().isEmpty(),
  check('name', 'Name is required').not().isEmpty(),
  check('price', 'Price is required').not().isEmpty(),
  check('miniDescription', 'Mini description is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('image', 'Image is required').not().isEmpty(),
  check('weightOptions', 'Weight Options is required').not().isEmpty(),
  check('stock', 'Stock is required').not().isEmpty(),
  check('brand', 'Brand is required').not().isEmpty(),
  check('tags', 'Tags is required').not().isEmpty(),
  check('discount').isNumeric()
], createProduct)

router.get('/', getProducts)

router.get('/:id', [
  check('id', 'ID is not valid').isMongoId()
], getProductById)

router.put('/:id', [
  check('id', 'ID is not valid').isMongoId()
], updateProduct)

router.delete('/:id', [
  check('id', 'ID is not valid').isMongoId()
], deleteProduct)

export default router
