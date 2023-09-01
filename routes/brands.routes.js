import { Router } from 'express'
import { check } from 'express-validator'
import { createBrand } from '../controllers/brand.controller.js'
import validateFields from '../middlewares/validate-fields.js'

const router = Router()

router.post('/', [
  check('name', 'The name is required').not().isEmpty(),
  check('image', 'The image link is required').not().isEmpty(),
  validateFields
], createBrand)

export default router
