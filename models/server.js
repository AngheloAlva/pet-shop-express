import Express from 'express'
import dbConnection from '../database/db.config.js'
import productRoutes from '../routes/products.routes.js'
import categoryRoutes from '../routes/categories.routes.js'
import userRoutes from '../routes/user.routes.js'
import brandRoutes from '../routes/brands.routes.js'
import orderRoutes from '../routes/orders.routes.js'
import cors from 'cors'

class Server {
  constructor () {
    this.app = new Express()
    this.PORT = process.env.PORT || 3001

    this.productPath = '/products'
    this.categoryPath = '/categories'
    this.userPath = '/users'
    this.brandPath = '/brands'
    this.orderPath = '/orders'

    this.connectDB()
    this.middlewares()
    this.routes()
  }

  async connectDB () {
    await dbConnection()
  }

  routes () {
    this.app.use(this.productPath, productRoutes)
    this.app.use(this.categoryPath, categoryRoutes)
    this.app.use(this.userPath, userRoutes)
    this.app.use(this.brandPath, brandRoutes)
    this.app.use(this.orderPath, orderRoutes)
  }

  middlewares () {
    this.app.use(cors())
    this.app.use(Express.json())
  }

  listen () {
    this.app.listen(this.PORT, () => {
      console.log(`Example app listening on port ${this.PORT}!`)
    })
  }
}

export default Server
