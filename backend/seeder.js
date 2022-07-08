import 'colors'
import dotenv from 'dotenv'
import Products from './data/Products.js'
import Users from './data/Users.js'
import Order from './models/Order.js'
import Product from './models/Product.js'
import User from './models/User.js'
dotenv.config()

import connectDB from './config/db.js'

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    console.log('Database cleared!'.green.inverse)

    const createdUser = await User.insertMany(Users)
    const adminUser = createdUser[0]._id

    const sampleProducts = Products.map((product) => {
      return {
        ...product,
        user: adminUser,
      }
    })
    await Product.insertMany(sampleProducts)
    console.log('Data imported successfuly!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(error).red.inverse
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    console.log('Data destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(error).red.inverse
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
