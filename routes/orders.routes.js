import { check } from 'express-validator'
import { Router } from 'express'
import { createOrder, getOrders } from '../controllers/order.controller.js'
import validateFields from '../middlewares/validate-fields.js'

const router = Router()

router.post('/', [
  check('id', 'The id is required').not().isEmpty(),
  check('userId', 'The userId is required').not().isEmpty(),
  check('RUT', 'The RUT is required').not().isEmpty(),
  check('products', 'The products is required').not().isEmpty(),
  check('total', 'The total is required').not().isEmpty().isNumeric(),
  check('paymentMethod', 'The paymentMethod is required').not().isEmpty().isIn(['CREDIT_CARD', 'DEBIT_CARD', 'TRANSFER', 'CASH']),
  check('paymentStatus', 'The paymentStatus is required').not().isEmpty().isIn(['PENDING', 'COMPLETED', 'CANCELED']),
  check('shippingMethod', 'The shippingMethod is required').not().isEmpty().isIn(['CHILEXPRESS', 'STARKEN', 'BLUE EXPRESS', 'PICKUP', 'SHOP DELIVERY']),
  check('shippingStatus', 'The shippingStatus is required').not().isEmpty().isIn(['PENDING', 'COMPLETED', 'CANCELED']),
  check('shippingAddress', 'The shippingAddress is required').not().isEmpty(),
  validateFields
], createOrder)

router.get('/', getOrders)

export default router
