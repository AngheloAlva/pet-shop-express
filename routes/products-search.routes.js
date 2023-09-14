import { Router } from 'express'
import { getProductBySearch } from '../controllers/product.controller'

const router = Router()

router.get('/', getProductBySearch)

export default router
