import Express from 'express'
import dbConnection from '../database/db.config.js'
import productRoutes from '../routes/products.routes.js'
import categoryRoutes from '../routes/categories.routes.js'
import userRoutes from '../routes/user.routes.js'

class Server {
  constructor () {
    this.app = new Express()
    this.PORT = process.env.PORT || 3001

    this.productPath = '/products'
    this.categoryPath = '/categories'
    this.userPath = '/users'

    this.connectDB()
    this.routes()
  }

  async connectDB () {
    await dbConnection()
  }

  routes () {
    this.app.use(this.productPath, productRoutes)
    this.app.use(this.categoryPath, categoryRoutes)
    this.app.use(this.userPath, userRoutes)
  }

  listen () {
    this.app.listen(this.PORT, () => {
      console.log(`Example app listening on port ${this.PORT}!`)
    })
  }
}

export default Server
