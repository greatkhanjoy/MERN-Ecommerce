import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/Product.js'
const Router = express.Router()

Router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find()
    res.status(200).json(products)
  })
)

Router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
      res.status(404)
      throw new Error('Product not found')
    }
    res.status(200).json(product)
  })
)

export default Router
