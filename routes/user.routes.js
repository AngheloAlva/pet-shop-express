import { Router } from 'express'
import { check } from 'express-validator'
import { createUser, deleteUser, getUserById, getUsers } from '../controllers/user.controller'

const router = Router()

router.get('/', getUsers)

router.get('/:id', [
  check('id', 'ID is not valid').isMongoId()
], getUserById)

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email is not valid').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  check('password', 'Password must be 6 characters').isLength({ min: 6 })
], createUser)

router.delete('/:id', [
  check('id', 'ID is not valid').isMongoId()
], deleteUser)

export default router
