import express from 'express'
import {
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
} from '../controllers/productController.js'
import { adminOnly, protect } from '../middlewares/authMiddleware.js'
const Router = express.Router()

Router.route('/').get(getProducts)
Router.route('/:id')
  .get(getProduct)
  .delete(protect, adminOnly, deleteProduct)
  .put(protect, adminOnly, editProduct)

export default Router
