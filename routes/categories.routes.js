import { Router } from 'express'
import { check } from 'express-validator'
import { getCategories, createCategory, updateCategory, deleteCategory, getCategory } from '../controllers/category.controller.js'
import validateFields from '../middlewares/validate-fields.js'

const router = Router()

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('image', 'Image is required').not().isEmpty(),
  check('image').not().isEmpty(),
  check('createAt').isDate(),
  validateFields
], createCategory)

router.get('/', getCategories)

router.get('/:id', [
  check('id', 'ID is not valid').isMongoId(),
  validateFields
], getCategory)

router.put('/:id', [
  check('id', 'ID is not valid').isMongoId(),
  validateFields
], updateCategory)

router.delete('/:id', [
  check('id', 'ID is not valid').isMongoId(),
  validateFields
], deleteCategory)

export default router
