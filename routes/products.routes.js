import { Router } from 'express'
import { getProducts, createProduct, updateProduct, deleteProduct, getProductById } from '../controllers/product.controller.js'

const router = Router()

router.post('/', createProduct)

router.get('/', getProducts)

router.get('/:id', getProductById)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)

export default router
