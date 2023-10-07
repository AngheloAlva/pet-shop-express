import { Router } from 'express'
import { getOrdersByUserId, getOrders } from '../controllers/order.controller.js'

const router = Router()

router.get('/:userId', getOrdersByUserId)

router.get('/', getOrders)

export default router
