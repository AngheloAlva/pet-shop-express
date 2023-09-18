import { Router } from 'express'
import { check } from 'express-validator'
import { createUser, deleteUser, getUserById, getUserCart, getUsers } from '../controllers/user.controller.js'
import validateFields from '../middlewares/validate-fields.js'

const router = Router()

router.get('/', getUsers)

router.get('/:id/cart', [
  check('id', 'ID is not valid').not().isEmpty(),
  validateFields
], getUserCart)

router.get('/:id', [
  check('id', 'ID is not valid').not().isEmpty(),
  validateFields
], getUserById)

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

export default router
