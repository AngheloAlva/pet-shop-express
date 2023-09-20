import { Router } from 'express'
import { check } from 'express-validator'
import { createUser, deleteUser, getCart, getUserById, getUsers, updateUser, addProductToCart, updateCart } from '../controllers/user.controller.js'
import validateFields from '../middlewares/validate-fields.js'

const router = Router()

router.get('/', getUsers)

router.get('/:id/cart', [
  check('id', 'ID is not valid').not().isEmpty(),
  validateFields
], getCart)

router.get('/:id', [
  check('id', 'ID is not valid').not().isEmpty(),
  validateFields
], getUserById)

router.post('/cart', [
  check('userId', 'ID is not valid').not().isEmpty(),
  check('productId', 'ID is not valid').not().isEmpty(),
  check('quantity', 'Quantity is not valid').not().isEmpty().isNumeric(),
  validateFields
], addProductToCart)

router.put('/cart', [
  check('userId', 'ID is not valid').not().isEmpty(),
  check('productId', 'ID is not valid').not().isEmpty(),
  check('quantity', 'Quantity is not valid').not().isEmpty().isNumeric(),
  validateFields
], updateCart)

router.post('/', [
  check('id', 'ID is required').not().isEmpty(),
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email is not valid').isEmail(),
  validateFields
], createUser)

router.delete('/:id', [
  check('id', 'ID is not valid').not().isEmpty(),
  validateFields
], deleteUser)

router.put('/:id', [
  check('id', 'ID is not valid').not().isEmpty(),
  validateFields
], updateUser)

export default router
