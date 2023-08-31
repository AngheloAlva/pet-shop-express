import mongoose from 'mongoose'

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log(error)
    throw new Error('Error connecting to MongoDB')
  }
}

export default dbConnection
