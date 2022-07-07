import 'colors'
import dotenv from 'dotenv'
import express from 'express'
import Products from './data/Products.js'
dotenv.config()
const app = express()
const port = process.env.PORT || 5000
app.get('/api/products', (req, res) => {
  res.json(Products)
})

app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id
  const product = Products.find((product) => product._id === productId)
  res.json(product)
})

app.listen(port, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode and started on port ${port}`
      .blue
  )
)
