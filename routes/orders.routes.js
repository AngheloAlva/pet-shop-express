import { check } from 'express-validator'
import { Router } from 'express'
import { createOrder, getOrders } from '../controllers/order.controller.js'
import validateFields from '../middlewares/validate-fields.js'

const router = Router()

router.post('/', [
  check('userId', 'The userId is required').not().isEmpty(),
  check('RUT', 'The RUT is required').not().isEmpty(),
  check('products', 'The products is required').not().isEmpty(),
  check('total', 'The total is required').not().isEmpty().isNumeric(),
  check('shippingMethod', 'The shippingMethod is required').not().isEmpty().isIn(['DELIVERY', 'PICKUP']),
  check('shippingAddress', 'The shippingAddress is required').not().isEmpty(),
  validateFields
], createOrder)

router.get('/', getOrders)

export default router
