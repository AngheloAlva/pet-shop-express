import { Router } from 'express'
import { check } from 'express-validator'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductBySearch
} from '../controllers/product.controller.js'
import validateFields from '../middlewares/validate-fields.js'

const router = Router()

router.get('/search/', getProductBySearch)

router.post('/', [
  check('categoryId', 'Category is required').not().isEmpty(),
  check('petType', 'Pet Type is required').not().isEmpty(),
  check('name', 'Name is required').not().isEmpty(),
  check('miniDescription', 'Mini description is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('image', 'Image is required').not().isEmpty(),
  check('options', 'Weight Options is required').not().isEmpty(),
  check('brandId', 'Brand is required').not().isEmpty(),
  check('lifeStage', 'Life stage is required').not().isEmpty(),
  validateFields
], createProduct)

router.get('/', getProducts)

router.get('/:id', [
  check('id', 'ID is not valid').isMongoId(),
  validateFields
], getProductById)

router.put('/:id', [
  check('id', 'ID is not valid').isMongoId(),
  validateFields
], updateProduct)

router.delete('/:id', [
  check('id', 'ID is not valid').isMongoId(),
  validateFields
], deleteProduct)

export default router
