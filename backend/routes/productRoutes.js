import express from 'express'
import {
  createProduct,
  createReview,
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
} from '../controllers/productController.js'
import { adminOnly, protect } from '../middlewares/authMiddleware.js'
const Router = express.Router()

Router.route('/').get(getProducts).post(protect, adminOnly, createProduct)
Router.route('/:id')
  .get(getProduct)
  .delete(protect, adminOnly, deleteProduct)
  .put(protect, adminOnly, editProduct)

Router.route('/:id/reviews').post(protect, createReview)
export default Router
