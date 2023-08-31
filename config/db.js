import mongoose from 'mongoose'
import 'dotenv/config'

mongoose.connect(process.env.DB_CONNECTION)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})

export default db
