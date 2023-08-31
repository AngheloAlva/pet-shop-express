import Express from 'express'
import dbConnection from '../database/db.config.js'
import productRoutes from '../routes/products.routes.js'
import categoryRoutes from '../routes/categories.routes.js'

class Server {
  constructor () {
    this.app = new Express()
    this.PORT = process.env.PORT || 3001

    this.productPath = '/products'
    this.categoryPath = '/categories'

    this.connectDB()
    this.routes()
  }

  async connectDB () {
    await dbConnection()
  }

  routes () {
    this.app.use(this.productPath, productRoutes)
    this.app.use(this.categoryPath, categoryRoutes)
  }

  listen () {
    this.app.listen(this.PORT, () => {
      console.log(`Example app listening on port ${this.PORT}!`)
    })
  }
}

export default Server
