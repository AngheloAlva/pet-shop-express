import { Router } from 'express'
import { createCheckoutSession, stripeWebhook } from '../controllers/payment.controller.js'

const router = Router()

router.post('/webhook', stripeWebhook)

router.post('/', createCheckoutSession)

export default router
