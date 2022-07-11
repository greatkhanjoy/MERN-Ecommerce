import asyncHandler from 'express-async-handler'
import Product from '../models/Product.js'

//@desc Get all products
//@route GET /api/products
//@access Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
  res.status(200).json(products)
})

//@desc Get single product
//@route GET /api/products/:id
//@access Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }
  res.status(200).json(product)
})

export { getProducts, getProduct }
