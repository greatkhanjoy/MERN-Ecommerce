import asyncHandler from 'express-async-handler'
import Product from '../models/Product.js'

//@desc Get all products
//@route GET /api/products
//@access Public

const getProducts = asyncHandler(async (req, res) => {
  const perPage = parseInt(req.query.limit) || 4
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  const count = await Product.find(keyword).countDocuments()
  const products = await Product.find({ ...keyword }).limit(perPage)
  res.status(200).json({ products, count })
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

//@desc Create product
//@route POST /api/products
//@access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  req.body.user = req.user.id
  const product = await Product.create(req.body)
  res.status(201).json(product)
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

//@desc Create new Review
//@route POST /api/products/:id/reviews
//@access Private/User
const createReview = asyncHandler(async (req, res) => {
  const { comment, rating } = req.body
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  )

  if (alreadyReviewed) {
    res.status(400)
    throw new Error('You have already reviewed this product')
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  }
  product.reviews.push(review)
  product.numReviews = product.reviews.length
  product.rating =
    product.reviews.reduce((acc, review) => acc + review.rating, 0) /
    product.reviews.length

  await product.save()
  res.status(200).json(product)
})

export {
  getProducts,
  getProduct,
  deleteProduct,
  editProduct,
  createProduct,
  createReview,
}
