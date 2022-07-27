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

//@desc Edit product
//@route PUT /api/products/:id
//@access Private/Admin
const editProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(200).json(product)
})

//@desc Delete product
//@route DELETE /api/products/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }
  await product.remove()
  res.status(200).json({ success: true })
})

export { getProducts, getProduct, deleteProduct, editProduct }
