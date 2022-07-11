import 'colors'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middlewares/errorHandler.js'
import Products from './routes/productRoutes.js'
import AuthRoutes from './routes/userRoutes.js'
dotenv.config()
connectDB()
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/products', Products)
app.use('/api/users', AuthRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode and started on port ${port}`
      .green.bold
  )
)
